import { neon } from "@neondatabase/serverless";

const STATE_ID = "default";
const SPORTMONKS_BASE_URL = "https://api.sportmonks.com/v3/football";
const WORLD_CUP_SEASON_ID = 26618;
const GROUP_STAGE_ID = 77478590;
const STAGE_TO_GAME = {
  77479086: "round32",
  77479087: "round16",
  77479088: "quarterfinal",
  77479089: "semifinal",
  77479090: "final",
  77479091: "final"
};

const TEAM_ALIASES = {
  "bosnia and herzegovina": "Bosnia",
  "côte d'ivoire": "Ivory Coast",
  "cote d'ivoire": "Ivory Coast",
  "curacao": "Curacao",
  "curaçao": "Curacao",
  "czech republic": "Czechia",
  "turkey": "Turkiye",
  "türkiye": "Turkiye",
  "united states": "USA",
  "united states of america": "USA"
};

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS league_state (
      id text PRIMARY KEY,
      state jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\([^)]*\)/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function canonicalTeamName(name) {
  const key = String(name || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return TEAM_ALIASES[key] || name;
}

function getArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

function getFixtureStageId(fixture) {
  return Number(fixture.stage_id || fixture.stage?.id || fixture.stage?.data?.id || 0);
}

function getFixtureParticipants(fixture) {
  const participants = getArray(fixture.participants);
  return participants.map((participant) => ({
    id: Number(participant.id || participant.participant_id || 0),
    name: canonicalTeamName(participant.name || participant.short_code || "")
  })).filter((participant) => participant.id && participant.name);
}

function teamIdForEvent(event) {
  return Number(event.participant_id || event.team_id || 0);
}

function eventType(event) {
  return String(event.type?.developer_name || event.type?.code || event.type?.name || event.type || "").toUpperCase();
}

function isGoalEvent(event) {
  const type = eventType(event);
  return type === "GOAL" || type === "PENALTY";
}

function gameIdForFixture(fixture, teamName, groupGameMap) {
  const stageId = getFixtureStageId(fixture);
  if (stageId === GROUP_STAGE_ID) return groupGameMap.get(`${normalize(teamName)}:${fixture.id}`);
  return STAGE_TO_GAME[stageId] || null;
}

function playerIndexes(roster) {
  const byTeamAndName = new Map();
  const byName = new Map();
  roster.forEach((player) => {
    const playerName = normalize(player.name);
    const teamName = normalize(player.team);
    byTeamAndName.set(`${teamName}:${playerName}`, player);
    if (!byName.has(playerName)) byName.set(playerName, []);
    byName.get(playerName).push(player);
  });
  return { byTeamAndName, byName };
}

function findPlayer(indexes, playerName, teamName, draftedIds) {
  if (!playerName) return null;
  const direct = indexes.byTeamAndName.get(`${normalize(teamName)}:${normalize(playerName)}`);
  if (direct && draftedIds.has(direct.id)) return direct;
  const candidates = (indexes.byName.get(normalize(playerName)) || []).filter((player) => draftedIds.has(player.id));
  if (candidates.length === 1) return candidates[0];
  return null;
}

function addStat(nextStats, playerId, gameId, key) {
  if (!playerId || !gameId) return;
  const existing = nextStats[playerId] || {};
  const games = existing.games || {};
  const game = games[gameId] || {};
  nextStats[playerId] = {
    ...existing,
    games: {
      ...games,
      [gameId]: {
        goals: Number(game.goals || 0) + (key === "goals" ? 1 : 0),
        assists: Number(game.assists || 0) + (key === "assists" ? 1 : 0)
      }
    }
  };
}

async function sportmonksRequest(path, token, params = {}) {
  const url = new URL(`${SPORTMONKS_BASE_URL}${path}`);
  url.searchParams.set("api_token", token);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });

  const response = await fetch(url);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || payload.error || `Sportmonks request failed with ${response.status}`);
  }
  return payload;
}

async function fetchWorldCupFixtures(token) {
  const fixtures = [];
  for (let page = 1; page <= 10; page += 1) {
    const payload = await sportmonksRequest("/fixtures", token, {
      filters: `fixtureSeasons:${WORLD_CUP_SEASON_ID}`,
      include: "participants;events.type;state",
      per_page: 50,
      page
    });
    fixtures.push(...getArray(payload.data));
    if (!payload.meta?.pagination?.has_more) break;
  }
  return fixtures;
}

function buildGroupGameMap(fixtures) {
  const groupFixturesByTeam = new Map();
  fixtures.filter((fixture) => getFixtureStageId(fixture) === GROUP_STAGE_ID).forEach((fixture) => {
    getFixtureParticipants(fixture).forEach((participant) => {
      const key = normalize(participant.name);
      if (!groupFixturesByTeam.has(key)) groupFixturesByTeam.set(key, []);
      groupFixturesByTeam.get(key).push(fixture);
    });
  });

  const map = new Map();
  groupFixturesByTeam.forEach((teamFixtures, teamKey) => {
    teamFixtures
      .sort((a, b) => String(a.starting_at || "").localeCompare(String(b.starting_at || "")))
      .forEach((fixture, index) => {
        if (index < 3) map.set(`${teamKey}:${fixture.id}`, `group${index + 1}`);
      });
  });
  return map;
}

function scoreFromFixtures(state, fixtures) {
  const roster = Array.isArray(state.customRoster) ? state.customRoster : [];
  const draftedIds = new Set((state.picks || []).map((pick) => pick.playerId));
  const indexes = playerIndexes(roster);
  const groupGameMap = buildGroupGameMap(fixtures);
  const nextStats = {};
  const fixtureSummaries = [];
  let scoredEvents = 0;
  let matchedEvents = 0;

  fixtures.forEach((fixture) => {
    const participants = getFixtureParticipants(fixture);
    const teamById = new Map(participants.map((participant) => [participant.id, participant.name]));
    const events = getArray(fixture.events).filter(isGoalEvent).sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
    if (!events.length) return;

    events.forEach((event) => {
      scoredEvents += 1;
      const teamName = teamById.get(teamIdForEvent(event)) || "";
      const gameId = gameIdForFixture(fixture, teamName, groupGameMap);
      if (!gameId) return;

      const scorer = findPlayer(indexes, event.player_name, teamName, draftedIds);
      const assister = findPlayer(indexes, event.related_player_name, teamName, draftedIds);
      if (scorer) {
        addStat(nextStats, scorer.id, gameId, "goals");
        matchedEvents += 1;
      }
      if (assister) {
        addStat(nextStats, assister.id, gameId, "assists");
        matchedEvents += 1;
      }
    });

    fixtureSummaries.push({
      id: fixture.id,
      name: fixture.name,
      stage_id: getFixtureStageId(fixture),
      events: events.length
    });
  });

  return { nextStats, fixtureSummaries, scoredEvents, matchedEvents };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed." });
  }

  if (!process.env.DATABASE_URL) return json(res, 503, { error: "DATABASE_URL is not configured." });
  const token = process.env.SPORTMONKS_API_TOKEN || "";
  if (!token) {
    return json(res, 501, {
      error: "Score automation is ready, but Sportmonks credentials are not configured yet. Add SPORTMONKS_API_TOKEN in Vercel, then redeploy."
    });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await ensureTable(sql);
    const rows = await sql`SELECT state FROM league_state WHERE id = ${STATE_ID}`;
    const state = rows[0]?.state;
    if (!state) return json(res, 404, { error: "No league state found to update." });

    const fixtures = await fetchWorldCupFixtures(token);
    const { nextStats, fixtureSummaries, scoredEvents, matchedEvents } = scoreFromFixtures(state, fixtures);
    const updatedState = {
      ...state,
      stats: {
        ...(state.stats || {}),
        ...nextStats
      },
      scoreUpdatedAt: new Date().toISOString()
    };

    const updateRows = await sql`
      INSERT INTO league_state (id, state, updated_at)
      VALUES (${STATE_ID}, ${JSON.stringify(updatedState)}::jsonb, now())
      ON CONFLICT (id)
      DO UPDATE SET state = EXCLUDED.state, updated_at = now()
      RETURNING updated_at
    `;

    return json(res, 200, {
      ok: true,
      message: `Scores updated from Sportmonks. ${matchedEvents} drafted goal/assist events matched from ${scoredEvents} scoring events.`,
      updatedPlayers: Object.keys(nextStats).length,
      fixturesChecked: fixtures.length,
      fixturesWithGoals: fixtureSummaries.length,
      updated_at: updateRows[0].updated_at,
      state: { stats: updatedState.stats, teamStatus: updatedState.teamStatus }
    });
  } catch (error) {
    return json(res, 500, { error: error.message || "Score update failed." });
  }
}
