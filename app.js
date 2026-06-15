const TEAMS = [
  ["A", "Mexico"], ["A", "South Korea"], ["A", "South Africa"], ["A", "Czechia"],
  ["B", "Canada"], ["B", "Switzerland"], ["B", "Qatar"], ["B", "Bosnia"],
  ["C", "Brazil"], ["C", "Morocco"], ["C", "Scotland"], ["C", "Haiti"],
  ["D", "USA"], ["D", "Australia"], ["D", "Paraguay"], ["D", "Turkiye"],
  ["E", "Germany"], ["E", "Ecuador"], ["E", "Ivory Coast"], ["E", "Curacao"],
  ["F", "Netherlands"], ["F", "Japan"], ["F", "Tunisia"], ["F", "Sweden"],
  ["G", "Belgium"], ["G", "Iran"], ["G", "Egypt"], ["G", "New Zealand"],
  ["H", "Spain"], ["H", "Uruguay"], ["H", "Saudi Arabia"], ["H", "Cape Verde"],
  ["I", "France"], ["I", "Senegal"], ["I", "Norway"], ["I", "Iraq"],
  ["J", "Argentina"], ["J", "Austria"], ["J", "Algeria"], ["J", "Jordan"],
  ["K", "Portugal"], ["K", "Colombia"], ["K", "Uzbekistan"], ["K", "DR Congo"],
  ["L", "England"], ["L", "Croatia"], ["L", "Panama"], ["L", "Ghana"]
];

const KNOWN_PLAYERS = {
  Mexico: ["Guillermo Ochoa", "Raul Rangel", "Carlos Acevedo", "Jesus Gallardo", "Cesar Montes", "Johan Vasquez", "Edson Alvarez", "Luis Chavez", "Orbelin Pineda", "Hirving Lozano", "Santiago Gimenez"],
  "South Korea": ["Son Heung-min", "Kim Min-jae", "Lee Kang-in", "Hwang Hee-chan", "Cho Gue-sung", "Hwang In-beom", "Lee Jae-sung", "Kim Seung-gyu"],
  Brazil: ["Alisson", "Ederson", "Marquinhos", "Eder Militao", "Bruno Guimaraes", "Casemiro", "Vinicius Junior", "Rodrygo", "Raphinha", "Neymar"],
  Canada: ["Alphonso Davies", "Jonathan David", "Tajon Buchanan", "Cyle Larin", "Stephen Eustaquio", "Ismael Kone", "Alistair Johnston"],
  USA: ["Christian Pulisic", "Weston McKennie", "Tyler Adams", "Gio Reyna", "Tim Weah", "Antonee Robinson", "Yunus Musah", "Folarin Balogun"],
  Germany: ["Manuel Neuer", "Antonio Rudiger", "Joshua Kimmich", "Jamal Musiala", "Florian Wirtz", "Kai Havertz", "Leroy Sane"],
  Netherlands: ["Virgil van Dijk", "Frenkie de Jong", "Cody Gakpo", "Xavi Simons", "Memphis Depay", "Denzel Dumfries"],
  Belgium: ["Kevin De Bruyne", "Romelu Lukaku", "Jeremy Doku", "Youri Tielemans", "Thibaut Courtois", "Leandro Trossard"],
  Spain: ["Unai Simon", "Dani Carvajal", "Rodri", "Pedri", "Gavi", "Nico Williams", "Lamine Yamal", "Alvaro Morata"],
  France: ["Mike Maignan", "William Saliba", "Theo Hernandez", "Aurelien Tchouameni", "Antoine Griezmann", "Kylian Mbappe", "Ousmane Dembele"],
  Argentina: ["Emiliano Martinez", "Cristian Romero", "Enzo Fernandez", "Alexis Mac Allister", "Lionel Messi", "Julian Alvarez", "Lautaro Martinez"],
  Portugal: ["Diogo Costa", "Ruben Dias", "Bruno Fernandes", "Bernardo Silva", "Rafael Leao", "Cristiano Ronaldo", "Joao Felix"],
  England: ["Jordan Pickford", "John Stones", "Declan Rice", "Jude Bellingham", "Bukayo Saka", "Phil Foden", "Harry Kane", "Cole Palmer"],
  Croatia: ["Dominik Livakovic", "Josko Gvardiol", "Luka Modric", "Mateo Kovacic", "Marcelo Brozovic", "Andrej Kramaric"],
  Colombia: ["David Ospina", "Davinson Sanchez", "Daniel Munoz", "Jefferson Lerma", "James Rodriguez", "Luis Diaz", "Jhon Duran"],
  Uruguay: ["Sergio Rochet", "Jose Maria Gimenez", "Federico Valverde", "Rodrigo Bentancur", "Darwin Nunez", "Facundo Pellistri"],
  Morocco: ["Yassine Bounou", "Achraf Hakimi", "Noussair Mazraoui", "Sofyan Amrabat", "Hakim Ziyech", "Youssef En-Nesyri"],
  Norway: ["Erling Haaland", "Martin Odegaard", "Alexander Sorloth", "Oscar Bobb", "Sander Berge"],
  Sweden: ["Alexander Isak", "Viktor Gyokeres", "Dejan Kulusevski", "Emil Forsberg", "Victor Lindelof"],
  Japan: ["Takefusa Kubo", "Kaoru Mitoma", "Wataru Endo", "Daichi Kamada", "Takumi Minamino", "Ritsu Doan"],
  Senegal: ["Edouard Mendy", "Kalidou Koulibaly", "Idrissa Gueye", "Ismaila Sarr", "Sadio Mane", "Nicolas Jackson"],
  Ghana: ["Mohammed Kudus", "Thomas Partey", "Inaki Williams", "Jordan Ayew", "Antoine Semenyo"],
  Scotland: ["Andrew Robertson", "Kieran Tierney", "Scott McTominay", "John McGinn", "Billy Gilmour", "Che Adams"],
  Ecuador: ["Piero Hincapie", "Moises Caicedo", "Pervis Estupinan", "Enner Valencia", "Kendry Paez"],
  Australia: ["Mathew Ryan", "Harry Souttar", "Jackson Irvine", "Craig Goodwin", "Mitchell Duke"],
  Austria: ["David Alaba", "Marcel Sabitzer", "Christoph Baumgartner", "Konrad Laimer", "Marko Arnautovic"],
  Iran: ["Alireza Beiranvand", "Mehdi Taremi", "Sardar Azmoun", "Alireza Jahanbakhsh", "Saman Ghoddos"],
  Egypt: ["Mohamed Salah", "Omar Marmoush", "Mostafa Mohamed", "Trezeguet", "Mohamed Elneny"],
  Paraguay: ["Miguel Almiron", "Julio Enciso", "Gustavo Gomez", "Ramon Sosa", "Mathias Villasanti"],
  Switzerland: ["Yann Sommer", "Manuel Akanji", "Granit Xhaka", "Remo Freuler", "Breel Embolo", "Xherdan Shaqiri"]
};

const POSITION_PATTERN = ["GK", "GK", "GK", "DEF", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "MID", "MID", "MID", "FWD", "FWD", "FWD", "FWD", "DEF", "MID", "FWD", "DEF", "MID", "FWD", "DEF", "MID"];
const STORAGE_KEY = "worldCupPlayerPool.v1";
const SHARED_STATE_ENDPOINT = "/api/state";
const SCORE_UPDATE_ENDPOINT = "/api/update-scores";
const UPDATE_ACTIONS_ENABLED = false;
const OFFICIAL_ROSTER_UNLOCK_DATE = "2026-06-01";
const OFFICIAL_ROSTER_SOURCE = "https://en.wikipedia.org/w/api.php?action=parse&page=2026_FIFA_World_Cup_squads&prop=text&format=json&origin=*";
const ACTIVE_LOGIN_TIMEOUT_MS = 6 * 60 * 1000;
const ACTIVE_LOGIN_HEARTBEAT_MS = 2 * 60 * 1000;
const SHARED_STATE_REFRESH_MS = 30 * 1000;
const TEAM_NAME_ALIASES = {
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
const LEAGUE_PARTICIPANT_NAMES = [
  "Glenn Salzman",
  "Teddy Salzman",
  "Matt Jarvis",
  "Zella Jarvis",
  "Doyle Walton",
  "Beck Walton",
  "Scott Meyer"
];
const GAME_COLUMNS = [
  { id: "group1", label: "G1" },
  { id: "group2", label: "G2" },
  { id: "group3", label: "G3" },
  { id: "round32", label: "R32" },
  { id: "round16", label: "R16" },
  { id: "quarterfinal", label: "QF" },
  { id: "semifinal", label: "SF" },
  { id: "final", label: "Final/3P" }
];

let roster = [];
let rosterUpdateMessage = "";
let scoreUpdateMessage = "";
let sharedStateReady = false;
let sharedSaveTimer = null;
let activeLoginTimer = null;
let sharedRefreshTimer = null;
let lastSharedSnapshotJson = "";
let state = loadState();

function generateRoster() {
  const generated = [];
  TEAMS.forEach(([group, team]) => {
    const names = KNOWN_PLAYERS[team] || [];
    for (let index = 0; index < 26; index += 1) {
      const name = names[index] || `${team} roster slot ${index + 1}`;
      generated.push({
        id: slug(`${team}-${name}-${index + 1}`),
        name,
        team,
        group,
        position: inferPosition(index, name),
        source: names[index] ? "known/provisional" : "roster slot"
      });
    }
  });
  return generated;
}

async function initializeRoster() {
  roster = generateRoster();
  try {
    const response = await fetch("data/players.json", { cache: "no-store" });
    if (response.ok) {
      const imported = await response.json();
      if (Array.isArray(imported.players) && imported.players.length) roster = imported.players;
    }
  } catch (error) {
    // File access from file:// blocks fetch; the generated roster keeps the app usable.
  }
  if (Array.isArray(state.customRoster) && state.customRoster.length) {
    roster = state.customRoster;
  }
}

function inferPosition(index, name) {
  const manual = {
    Alisson: "GK", Ederson: "GK", "Guillermo Ochoa": "GK", "Raul Rangel": "GK", "Carlos Acevedo": "GK",
    "Emiliano Martinez": "GK", "Jordan Pickford": "GK", "Yann Sommer": "GK", "Mike Maignan": "GK",
    "Virgil van Dijk": "DEF", "Achraf Hakimi": "DEF", "Andrew Robertson": "DEF", "William Saliba": "DEF",
    Rodri: "MID", "Jude Bellingham": "MID", "Kevin De Bruyne": "MID", "Martin Odegaard": "MID",
    "Lionel Messi": "FWD", "Kylian Mbappe": "FWD", "Cristiano Ronaldo": "FWD", "Harry Kane": "FWD", "Erling Haaland": "FWD"
  };
  return manual[name] || POSITION_PATTERN[index] || "MID";
}

function defaultState() {
  const participants = LEAGUE_PARTICIPANT_NAMES.map((name, index) => ({ id: `p${index + 1}`, name }));
  return {
    participants,
    participantsLocked: false,
    draftOrder: participants.map((participant) => participant.id),
    draftOrderLocked: false,
    picks: [],
    queues: Object.fromEntries(participants.map((participant) => [participant.id, []])),
    stats: {},
    teamStatus: Object.fromEntries(TEAMS.map(([, team]) => [team, "Alive"])),
    customRoster: null,
    rosterUpdatedAt: "",
    activeLogins: {},
    loggedInUserId: null,
    activeTab: "draft",
    currentUserId: "p1",
    scoringTeam: TEAMS[0][1],
    queueSort: { key: "player", direction: "asc" },
    viewMode: "desktop",
    filters: { search: "", team: "All", position: "All", availability: "Available", hideDrafted: true }
  };
}

function loadState() {
  try {
    const defaults = defaultState();
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const merged = { ...defaults, ...saved, filters: { ...defaults.filters, ...(saved?.filters || {}) } };
    if (usesGeneratedParticipantNames(merged.participants)) {
      merged.participants = LEAGUE_PARTICIPANT_NAMES.map((name, index) => ({ id: `p${index + 1}`, name }));
      merged.queues = { ...Object.fromEntries(merged.participants.map((participant) => [participant.id, []])), ...(merged.queues || {}) };
    }
    ensureLeagueParticipants(merged);
    if (!merged.currentUserId && saved?.queueManager) merged.currentUserId = saved.queueManager;
    const participantIds = merged.participants.map((participant) => participant.id);
    merged.draftOrder = normalizeDraftOrder(merged.draftOrder, participantIds);
    pruneActiveLogins(merged);
    if (merged.loggedInUserId && !participantIds.includes(merged.loggedInUserId)) merged.loggedInUserId = null;
    if (!participantIds.includes(merged.currentUserId)) merged.currentUserId = merged.loggedInUserId || participantIds[0] || "p1";
    if (!saved?.draftOrder && merged.picks.length) {
      merged.participantsLocked = true;
      merged.draftOrderLocked = true;
    }
    return merged;
  } catch (error) {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function pruneActiveLogins(targetState = state) {
  const participantIds = new Set((targetState.participants || []).map((participant) => participant.id));
  const cutoff = Date.now() - ACTIVE_LOGIN_TIMEOUT_MS;
  targetState.activeLogins = Object.fromEntries(Object.entries(targetState.activeLogins || {}).filter(([participantId, timestamp]) => {
    return participantIds.has(participantId) && Date.parse(timestamp) >= cutoff;
  }));
}

function isParticipantLoggedIn(participantId) {
  const timestamp = state.activeLogins?.[participantId];
  return Boolean(timestamp && Date.parse(timestamp) >= Date.now() - ACTIVE_LOGIN_TIMEOUT_MS);
}

function touchActiveLogin(participantId, shouldSave = true) {
  if (!participantId) return;
  pruneActiveLogins();
  state.activeLogins = {
    ...(state.activeLogins || {}),
    [participantId]: new Date().toISOString()
  };
  if (shouldSave) saveSharedState();
}

function clearActiveLogin(participantId) {
  if (!participantId) return;
  state.activeLogins = { ...(state.activeLogins || {}) };
  delete state.activeLogins[participantId];
  saveSharedState();
}

function sharedStateSnapshot() {
  ensureLeagueParticipants(state);
  pruneActiveLogins();
  return {
    participants: state.participants,
    participantsLocked: state.participantsLocked,
    draftOrder: state.draftOrder,
    draftOrderLocked: state.draftOrderLocked,
    picks: state.picks,
    queues: state.queues,
    stats: state.stats,
    teamStatus: state.teamStatus,
    customRoster: state.customRoster,
    rosterUpdatedAt: state.rosterUpdatedAt,
    activeLogins: state.activeLogins
  };
}

function rememberSharedSnapshot() {
  lastSharedSnapshotJson = JSON.stringify(sharedStateSnapshot());
}

async function loadSharedState() {
  try {
    const response = await fetch(SHARED_STATE_ENDPOINT, { cache: "no-store" });
    if (!response.ok) return false;
    const payload = await response.json();
    if (!payload?.state) {
      sharedStateReady = true;
      saveSharedState();
      return true;
    }
    const localOnly = {
      loggedInUserId: state.loggedInUserId,
      currentUserId: state.currentUserId,
      activeTab: state.activeTab,
      scoringTeam: state.scoringTeam,
      queueSort: state.queueSort,
      viewMode: state.viewMode,
      filters: state.filters
    };
    state = {
      ...defaultState(),
      ...payload.state,
      ...localOnly,
      filters: { ...defaultState().filters, ...(localOnly.filters || {}) }
    };
    ensureLeagueParticipants(state);
    const participantIds = state.participants.map((participant) => participant.id);
    state.draftOrder = normalizeDraftOrder(state.draftOrder, participantIds);
    pruneActiveLogins(state);
    if (state.loggedInUserId && !participantIds.includes(state.loggedInUserId)) state.loggedInUserId = null;
    if (!participantIds.includes(state.currentUserId)) state.currentUserId = state.loggedInUserId || participantIds[0] || "p1";
    if (Array.isArray(state.customRoster) && state.customRoster.length) roster = state.customRoster;
    sharedStateReady = true;
    saveState();
    rememberSharedSnapshot();
    return true;
  } catch (error) {
    sharedStateReady = false;
    return false;
  }
}

function saveSharedState() {
  if (!sharedStateReady) return;
  window.clearTimeout(sharedSaveTimer);
  sharedSaveTimer = window.setTimeout(() => {
    const snapshot = sharedStateSnapshot();
    const snapshotJson = JSON.stringify(snapshot);
    if (snapshotJson === lastSharedSnapshotJson) return;
    lastSharedSnapshotJson = snapshotJson;
    fetch(SHARED_STATE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: snapshot })
    }).catch(() => {
      lastSharedSnapshotJson = "";
    });
  }, 250);
}

function ensureLeagueParticipants(targetState) {
  const existing = Array.isArray(targetState.participants) ? targetState.participants : [];
  const extras = existing.filter((participant) => {
    const index = Number(String(participant.id || "").replace("p", "")) - 1;
    return index >= LEAGUE_PARTICIPANT_NAMES.length;
  });
  targetState.participants = LEAGUE_PARTICIPANT_NAMES.map((name, index) => {
    const id = `p${index + 1}`;
    const existingParticipant = existing.find((participant) => participant.id === id);
    return { ...(existingParticipant || {}), id, name };
  }).concat(extras);
  targetState.queues = {
    ...Object.fromEntries(targetState.participants.map((participant) => [participant.id, []])),
    ...(targetState.queues || {})
  };
}

function normalizeDraftOrder(order, participantIds) {
  const clean = Array.isArray(order) ? order.filter((id) => participantIds.includes(id)) : [];
  participantIds.forEach((id) => {
    if (!clean.includes(id)) clean.push(id);
  });
  return clean;
}

function draftParticipants() {
  const byId = new Map(state.participants.map((participant) => [participant.id, participant]));
  const orderedIds = normalizeDraftOrder(state.draftOrder, state.participants.map((participant) => participant.id));
  state.draftOrder = orderedIds;
  return orderedIds.map((id) => byId.get(id)).filter(Boolean);
}

function usesGeneratedParticipantNames(participants) {
  return Array.isArray(participants) && participants.every((participant) => /^Participant \d+$/.test(participant.name));
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function currentPickInfo() {
  return pickInfoForIndex(state.picks.length);
}

function pickInfoForIndex(pickIndex) {
  const participants = draftParticipants();
  const totalPicks = participants.length * 10;
  if (pickIndex >= totalPicks) return null;
  const round = Math.floor(pickIndex / participants.length);
  const slot = pickIndex % participants.length;
  const participantIndex = round % 2 === 0 ? slot : participants.length - 1 - slot;
  return { pickIndex, round, participant: participants[participantIndex] };
}

function draftedMap() {
  return new Map(state.picks.map((pick) => [pick.playerId, pick]));
}

function scorePlayer(player) {
  const goalPoints = player.position === "DEF" ? 8 : player.position === "MID" ? 5 : 4;
  const assistPoints = player.position === "DEF" ? 4 : 3;
  return GAME_COLUMNS.reduce((sum, game) => {
    return sum + scorePlayerGame(player, game.id);
  }, 0);
}

function scorePlayerGame(player, gameId) {
  const stats = statsForGame(player.id, gameId);
  const goalPoints = player.position === "DEF" ? 8 : player.position === "MID" ? 5 : 4;
  const assistPoints = player.position === "DEF" ? 4 : 3;
  return stats.goals * goalPoints + stats.assists * assistPoints;
}

function statsForGame(playerId, gameId) {
  const stats = state.stats[playerId] || {};
  if (stats.games && stats.games[gameId]) {
    return {
      goals: Number(stats.games[gameId].goals || 0),
      assists: Number(stats.games[gameId].assists || 0)
    };
  }
  if (gameId === "group1" && ("goals" in stats || "assists" in stats)) {
    return {
      goals: Number(stats.goals || 0),
      assists: Number(stats.assists || 0)
    };
  }
  return { goals: 0, assists: 0 };
}

function setGameStat(playerId, gameId, key, value) {
  const existing = state.stats[playerId] || {};
  state.stats[playerId] = {
    ...existing,
    games: {
      ...(existing.games || {}),
      [gameId]: {
        ...((existing.games || {})[gameId] || {}),
        [key]: Number(value || 0)
      }
    }
  };
  saveSharedState();
}

function isTeamAlive(team) {
  return state.teamStatus[team] === "Alive";
}

function isAdminUser() {
  return nameForParticipant(state.loggedInUserId) === "Glenn Salzman";
}

function canDraftCurrentPick() {
  const info = currentPickInfo();
  if (!info || !state.draftOrderLocked) return false;
  if (isAdminUser()) return true;
  return state.loggedInUserId === info.participant.id;
}

function draftPermissionMessage() {
  const info = currentPickInfo();
  if (!state.draftOrderLocked) return "Lock the draft order before drafting players.";
  if (!info) return "The draft is complete.";
  if (!state.loggedInUserId) return `Sign in as ${info.participant.name} to make this pick.`;
  if (isAdminUser()) return "";
  return state.loggedInUserId === info.participant.id ? "" : `Only ${info.participant.name} can make this pick.`;
}

function render() {
  pruneActiveLogins();
  if (state.loggedInUserId) touchActiveLogin(state.loggedInUserId, false);
  saveState();
  document.body.classList.toggle("admin-user", isAdminUser());
  renderViewMode();
  renderLogin();
  renderPickStatus();
  renderUserSession();
  renderRosterUpdateStatus();
  renderParticipantSetup();
  renderTabs();
  renderDraftBoard();
  renderQueue();
  renderTeams();
  renderSquads();
  renderStandings();
  renderRules();
}

function renderViewMode() {
  const mobile = state.viewMode === "mobile";
  document.body.classList.toggle("mobile-view", mobile);
  const toggle = document.getElementById("viewModeToggle");
  if (toggle) toggle.checked = mobile;
}

function renderLogin() {
  const loggedIn = Boolean(state.loggedInUserId);
  document.body.classList.toggle("login-mode", !loggedIn);
  const loginParticipants = state.participants.filter((participant) => participant.name.trim());
  document.getElementById("loginParticipantButtons").innerHTML = loginParticipants.map((participant) => `
    <button type="button" class="${isParticipantLoggedIn(participant.id) ? "participant-online" : ""}" data-login-participant="${participant.id}">
      ${isParticipantLoggedIn(participant.id) ? `<span>Logged in</span>` : ""}
      ${escapeHtml(participant.name)}
    </button>
  `).join("");
}

function renderPickStatus() {
  const info = currentPickInfo();
  const onDeck = info ? pickInfoForIndex(info.pickIndex + 1) : null;
  document.getElementById("currentPickLabel").textContent = info ? `Pick ${info.pickIndex + 1} · Round ${info.round + 1}` : "Draft complete";
  document.getElementById("onClockLabel").textContent = !state.draftOrderLocked ? "Lock draft order to start" : info ? `${info.participant.name} on the clock` : "All rosters filled";
  document.getElementById("onDeckLabel").textContent = onDeck ? `On deck: ${onDeck.participant.name}` : "On deck: none";
}

function renderUserSession() {
  if (state.loggedInUserId) state.currentUserId = state.loggedInUserId;
  if (!state.participants.some((participant) => participant.id === state.currentUserId)) {
    state.currentUserId = state.participants[0]?.id || "p1";
  }
  const participantName = nameForParticipant(state.currentUserId);
  document.getElementById("userSession").innerHTML = `
    <span>Signed in as</span>
    <strong>${escapeHtml(participantName)}</strong>
    <button id="changeUserBtn" class="title-link">Change</button>
  `;
}

function renderRosterUpdateStatus() {
  const status = document.getElementById("rosterUpdateStatus");
  if (!status) return;
  const message = rosterUpdateMessage || (state.rosterUpdatedAt ? `Rosters updated ${new Date(state.rosterUpdatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "");
  status.textContent = message;
  status.hidden = !message;
}

function renderParticipantSetup() {
  const countSelect = document.getElementById("participantCount");
  countSelect.innerHTML = Array.from({ length: 4 }, (_, index) => {
    const count = LEAGUE_PARTICIPANT_NAMES.length + index;
    return `<option value="${count}">${count}</option>`;
  }).join("");
  countSelect.value = state.participants.length;
  countSelect.disabled = state.participantsLocked || state.picks.length > 0;
  document.getElementById("lockParticipantsBtn").disabled = state.participantsLocked || state.picks.length > 0;
  document.getElementById("randomizeOrderBtn").disabled = !state.participantsLocked || state.draftOrderLocked || state.picks.length > 0;
  document.getElementById("lockOrderBtn").disabled = !state.participantsLocked || state.draftOrderLocked || state.picks.length > 0;
  document.getElementById("saveParticipantsBtn").disabled = state.participantsLocked || state.picks.length > 0;
  document.getElementById("resetDraftBtn").hidden = !isAdminUser();

  document.getElementById("participantInputs").innerHTML = state.participants.map((participant, index) => `
    <div class="${isParticipantLoggedIn(participant.id) ? "logged-in-participant" : ""}">
      <label for="participant-${participant.id}">${isParticipantLoggedIn(participant.id) ? "Logged in" : `Team ${index + 1}`}</label>
      <input id="participant-${participant.id}" data-participant-name="${participant.id}" value="${escapeHtml(participant.name)}" ${state.participantsLocked || state.picks.length > 0 ? "disabled" : ""}>
    </div>
  `).join("");
}

function setParticipantCount(count) {
  if (state.participantsLocked || state.picks.length > 0) return;
  const existing = state.participants;
  const minimumCount = LEAGUE_PARTICIPANT_NAMES.length;
  const nextCount = Math.max(count, minimumCount);
  state.participants = Array.from({ length: nextCount }, (_, index) => existing[index] || { id: `p${index + 1}`, name: LEAGUE_PARTICIPANT_NAMES[index] || `Participant ${index + 1}` });
  ensureLeagueParticipants(state);
  state.queues = Object.fromEntries(state.participants.map((participant) => [participant.id, state.queues[participant.id] || []]));
  state.currentUserId = state.participants[0].id;
  state.participantsLocked = false;
  state.draftOrder = state.participants.map((participant) => participant.id);
  state.draftOrderLocked = false;
  state.picks = [];
  saveSharedState();
  render();
}

function renderTabs() {
  document.body.classList.toggle("draft-mode", state.activeTab === "draft");
  document.querySelector(".setup-panel").classList.toggle("hidden", state.activeTab !== "draft");
  document.querySelectorAll(".tab").forEach((button) => button.classList.toggle("active", button.dataset.tab === state.activeTab));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === state.activeTab));
}

function renderDraftBoard() {
  const panel = document.getElementById("draft");
  const participants = draftParticipants();
  const picksBySlot = new Map(state.picks.map((pick) => [`${pick.round}-${pick.participantId}`, pick]));
  const current = currentPickInfo();
  let html = `<div class="draft-workflow">
    <div><span class="badge ${state.participantsLocked ? "alive" : ""}">1. ${state.participantsLocked ? "Participants locked" : "Lock participants"}</span></div>
    <div><span class="badge ${state.draftOrder?.length ? "alive" : ""}">2. Draft order ${state.participantsLocked ? "ready" : "pending"}</span></div>
    <div><span class="badge ${state.draftOrderLocked ? "alive" : ""}">3. ${state.draftOrderLocked ? "Draft order locked" : "Lock draft order"}</span></div>
  </div>`;
  html += `<div class="draft-scroll-hint">Scroll sideways to see every participant.</div>`;
  html += `<div class="draft-grid">`;
  html += `<div class="draft-row" style="grid-template-columns: 72px repeat(${participants.length}, minmax(150px, 1fr));">`;
  html += `<div class="draft-cell header">Round</div>${participants.map((participant) => `<div class="draft-cell header">${escapeHtml(participant.name)}</div>`).join("")}</div>`;

  for (let round = 0; round < 10; round += 1) {
    html += `<div class="draft-row" style="grid-template-columns: 72px repeat(${participants.length}, minmax(150px, 1fr));">`;
    html += `<div class="draft-cell"><strong>${round + 1}</strong><div class="tiny">${round % 2 === 0 ? "→" : "←"}</div></div>`;
    participants.forEach((participant) => {
      const pick = picksBySlot.get(`${round}-${participant.id}`);
      const player = pick ? roster.find((item) => item.id === pick.playerId) : null;
      const isOnClock = current && current.round === round && current.participant.id === participant.id;
      const positionClass = player ? `position-${player.position.toLowerCase()}` : "";
      html += `<div class="draft-cell ${isOnClock ? "on-clock" : ""} ${positionClass}">
        <div class="pick-meta">${isOnClock ? "On clock" : pick ? `Pick ${pick.pickNumber}` : "Open"}</div>
        ${player ? `<span class="player-name">${escapeHtml(player.name)}</span><div class="player-meta">${player.team} · ${player.position}</div>` : ""}
      </div>`;
    });
    html += `</div>`;
  }
  html += `</div>`;
  panel.innerHTML = html;
}

function renderQueue() {
  const panel = document.getElementById("queue");
  if (state.filters.position === "GK") state.filters.position = "All";
  const teams = ["All", ...TEAMS.map(([, team]) => team).sort((a, b) => a.localeCompare(b))];
  const filtered = filteredPlayers();
  const drafted = draftedMap();
  const current = currentPickInfo();
  const canDraft = canDraftCurrentPick();
  const permissionMessage = draftPermissionMessage();
  const currentUserId = state.currentUserId;
  const availablePlayerIds = new Set(roster.filter((player) => isDraftEligible(player) && !drafted.has(player.id) && isTeamAlive(player.team)).map((player) => player.id));
  const queue = new Set((state.queues[currentUserId] || []).filter((id) => availablePlayerIds.has(id)));
  state.queues[currentUserId] = [...queue];

  const queuedPlayers = [...queue].map((id) => roster.find((player) => player.id === id)).filter((player) => player && isDraftEligible(player));

  panel.innerHTML = `
    ${rosterUpdateMessage || state.rosterUpdatedAt ? `<div class="roster-update-note">
      <strong>World Cup Rosters</strong>
      <span class="tiny">${rosterUpdateMessage ? escapeHtml(rosterUpdateMessage) : `Last updated ${new Date(state.rosterUpdatedAt).toLocaleString()}`}</span>
    </div>` : ""}
    <div class="queue-workspace">
      <div>
        <div class="toolbar">
          <div><label for="searchPlayers">Search</label><input id="searchPlayers" value="${escapeHtml(state.filters.search)}" placeholder="Player or country"></div>
          <div><label for="teamFilter">Team</label><select id="teamFilter">${teams.map((team) => `<option ${team === state.filters.team ? "selected" : ""}>${team}</option>`).join("")}</select></div>
          <div><label for="positionFilter">Position</label><select id="positionFilter">${["All", "DEF", "MID", "FWD"].map((position) => `<option ${position === state.filters.position ? "selected" : ""}>${position}</option>`).join("")}</select></div>
          <div>
            <label for="hideDraftedToggle">Hide Drafted</label>
            <label class="switch-control">
              <span class="switch-state">Off</span>
              <input id="hideDraftedToggle" type="checkbox" data-toggle-drafted ${state.filters.hideDrafted ? "checked" : ""}>
              <span class="switch-track"><span class="switch-thumb"></span></span>
            <span class="switch-state">On</span>
          </label>
        </div>
          <div class="private-queue-note"><span class="tiny">Queue is private to the signed-in user.</span></div>
        </div>
        ${permissionMessage && state.draftOrderLocked ? `<div class="draft-permission-note">${escapeHtml(permissionMessage)}</div>` : ""}
        <div class="table-shell">
          <table>
            <thead><tr>
              <th><button class="sort-header" data-sort-queue="player">Player ${sortMark("player")}</button></th>
              <th><button class="sort-header" data-sort-queue="team">Team ${sortMark("team")}</button></th>
              <th><button class="sort-header" data-sort-queue="position">Pos ${sortMark("position")}</button></th>
              <th>Status</th><th></th>
            </tr></thead>
            <tbody id="queuePlayerRows">
              ${queueRowsHtml(filtered, drafted, queue, current)}
            </tbody>
          </table>
        </div>
      </div>
      <aside class="queue-box">
        <div class="queue-box-head">
          <div>
            <span class="tiny">Queue</span>
            <strong>${escapeHtml(nameForParticipant(currentUserId))}</strong>
          </div>
          <span class="badge">${queuedPlayers.length}</span>
        </div>
        ${queuedPlayers.length ? queuedPlayers.map((player) => `<div class="queued-player">
          <div>
            <strong>${escapeHtml(player.name)}</strong>
            <div class="tiny">${escapeHtml(player.team)} · ${player.position}</div>
          </div>
          <div class="queued-actions">
            <button class="primary" data-draft="${player.id}" ${!current || !state.draftOrderLocked || !canDraft ? "disabled" : ""}>Draft</button>
            <button data-remove-queue="${player.id}">Remove</button>
          </div>
        </div>`).join("") : `<div class="empty-state compact"><strong>No queued players.</strong><span>Use Queue from the table to add targets.</span></div>`}
      </aside>
    </div>
  `;
}

function renderQueueRowsOnly() {
  const rows = document.getElementById("queuePlayerRows");
  if (!rows) return;
  const drafted = draftedMap();
  const queue = new Set(state.queues[state.currentUserId] || []);
  rows.innerHTML = queueRowsHtml(filteredPlayers(), drafted, queue, currentPickInfo());
}

function queueRowsHtml(players, drafted, queue, current) {
  const canDraft = canDraftCurrentPick();
  return players.map((player) => {
    const pick = drafted.get(player.id);
    const queued = queue.has(player.id);
    return `<tr>
      <td><strong>${escapeHtml(player.name)}</strong><div class="tiny">${escapeHtml(player.source || "imported roster")}</div></td>
      <td>${escapeHtml(player.team)} <span class="tiny">Group ${player.group}</span></td>
      <td><span class="badge">${player.position}</span></td>
      <td><span class="badge ${pick ? "" : "alive"}">${pick ? "Drafted" : "Available"}</span></td>
      <td class="row-actions">
        <button data-queue="${player.id}" ${pick || !isTeamAlive(player.team) ? "disabled" : ""}>${queued ? "Queued" : "Queue"}</button>
        <button class="primary" data-draft="${player.id}" ${pick || !current || !isTeamAlive(player.team) || !state.draftOrderLocked || !canDraft ? "disabled" : ""}>Draft</button>
      </td>
    </tr>`;
  }).join("");
}

function filteredPlayers() {
  const drafted = draftedMap();
  const term = state.filters.search.trim().toLowerCase();
  return roster.filter((player) => {
    if (!isDraftEligible(player)) return false;
    const isDrafted = drafted.has(player.id);
    if (isDrafted && state.filters.hideDrafted) return false;
    if (!isDrafted && !isTeamAlive(player.team)) return false;
    if (state.filters.team !== "All" && player.team !== state.filters.team) return false;
    if (state.filters.position !== "All" && player.position !== state.filters.position) return false;
    return !term || player.name.toLowerCase().includes(term) || player.team.toLowerCase().includes(term);
  }).sort(compareQueuePlayers);
}

function isDraftEligible(player) {
  return player.position !== "GK";
}

async function updateOfficialRosters() {
  const today = new Date();
  const unlockDate = new Date(`${OFFICIAL_ROSTER_UNLOCK_DATE}T00:00:00`);
  if (today < unlockDate) {
    rosterUpdateMessage = "Official squad updates are locked until June 1, 2026.";
    renderQueue();
    return;
  }

  rosterUpdateMessage = "Checking official roster source...";
  render();

  try {
    const response = await fetch(OFFICIAL_ROSTER_SOURCE, {
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`Roster source returned ${response.status}`);
    const responseText = await response.text();
    let payload;
    try {
      payload = JSON.parse(responseText);
    } catch (error) {
      throw new Error("Roster source did not return JSON.");
    }
    const html = payload?.parse?.text?.["*"];
    const players = parseOfficialRosterHtml(html);
    if (!players.length) throw new Error("No players were found in the roster tables.");
    state.customRoster = players;
    state.rosterUpdatedAt = new Date().toISOString();
    roster = players;
    rosterUpdateMessage = `Updated ${players.length} players from the official roster source.`;
    saveSharedState();
    render();
  } catch (error) {
    rosterUpdateMessage = `Roster update failed: ${error.message}`;
    renderQueue();
  }
}

async function updateScoresFromProvider() {
  if (!isAdminUser()) return;
  scoreUpdateMessage = "Updating scores...";
  renderTeams();
  try {
    const response = await fetch(SCORE_UPDATE_ENDPOINT, { method: "POST" });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Score update failed.");

    if (payload.state) {
      state = {
        ...state,
        stats: payload.state.stats || state.stats,
        teamStatus: payload.state.teamStatus || state.teamStatus
      };
      saveState();
      saveSharedState();
    }

    scoreUpdateMessage = payload.message || `Scores updated. ${payload.updatedPlayers || 0} player rows changed.`;
  } catch (error) {
    scoreUpdateMessage = `Score update failed: ${error.message}`;
  }
  render();
}

function parseOfficialRosterHtml(html) {
  if (!html) return [];
  const doc = new DOMParser().parseFromString(html, "text/html");
  const players = [];
  const teamGroups = Object.fromEntries(TEAMS.map(([group, team]) => [team.toLowerCase(), group]));
  const seenPlayers = new Set();

  doc.querySelectorAll("h2, h3").forEach((heading) => {
    const team = canonicalTeamName(cleanText(heading.textContent));
    if (!teamGroups[team.toLowerCase()]) return;
    const sectionNodes = [];
    const headingBlock = heading.parentElement?.classList.contains("mw-heading") ? heading.parentElement : heading;
    let node = headingBlock.nextElementSibling;
    while (node && !node.querySelector?.("h2, h3") && !["H2", "H3"].includes(node.tagName)) {
      sectionNodes.push(node);
      node = node.nextElementSibling;
    }
    sectionNodes.flatMap((section) => [...section.querySelectorAll("tr")]).forEach((row) => {
      const cells = [...row.querySelectorAll("td, th")].map((cell) => cleanText(cell.textContent));
      const positionIndex = cells.findIndex((cell) => rosterPositionFromCell(cell));
      if (positionIndex === -1) return;
      const position = normalizePosition(rosterPositionFromCell(cells[positionIndex]));
      const name = cells.slice(positionIndex + 1).find((cell) => cell && !/^\d+$/.test(cell) && !["GK", "DF", "MF", "FW", "DEF", "MID", "FWD"].includes(cell));
      if (!name) return;
      const id = slug(`${team}-${name}`);
      if (seenPlayers.has(id)) return;
      seenPlayers.add(id);
      players.push({
        id,
        name,
        team,
        group: teamGroups[team.toLowerCase()],
        position,
        source: "Official roster refresh"
      });
    });
  });

  return players;
}

function rosterPositionFromCell(value) {
  return String(value || "").match(/(GK|DF|MF|FW|DEF|MID|FWD)/)?.[1] || "";
}

function canonicalTeamName(team) {
  const key = cleanText(team).toLowerCase();
  return TEAM_NAME_ALIASES[key] || team;
}

function normalizePosition(position) {
  return position.replace("DF", "DEF").replace("MF", "MID").replace("FW", "FWD");
}

function cleanText(value) {
  return String(value || "").replace(/\[[^\]]+\]/g, "").replace(/\s+/g, " ").trim();
}

function compareQueuePlayers(a, b) {
  const sort = state.queueSort || { key: "player", direction: "asc" };
  const positionRank = { GK: 0, DEF: 1, MID: 2, FWD: 3 };
  const values = {
    player: [a.name, b.name],
    team: [a.team, b.team],
    position: [positionRank[a.position] ?? 99, positionRank[b.position] ?? 99]
  }[sort.key] || [a.name, b.name];
  let result = typeof values[0] === "number"
    ? values[0] - values[1]
    : String(values[0]).localeCompare(String(values[1]));
  if (result === 0) result = a.name.localeCompare(b.name);
  return sort.direction === "desc" ? -result : result;
}

function sortMark(key) {
  const sort = state.queueSort || { key: "player", direction: "asc" };
  if (sort.key !== key) return "";
  return sort.direction === "asc" ? "▲" : "▼";
}

function renderTeams() {
  const panel = document.getElementById("teams");
  const drafted = draftedMap();
  const draftedPlayerIds = new Set(drafted.keys());
  const draftedTeams = TEAMS.filter(([, team]) => roster.some((player) => player.team === team && draftedPlayerIds.has(player.id)));
  if (!draftedTeams.length) {
    panel.innerHTML = `
      <div class="rules-strip">
        <div class="rule"><span class="tiny">DEF goal</span><strong>8 pts</strong></div>
        <div class="rule"><span class="tiny">MID goal</span><strong>5 pts</strong></div>
        <div class="rule"><span class="tiny">FWD goal</span><strong>4 pts</strong></div>
        <div class="rule"><span class="tiny">DEF assist</span><strong>4 pts</strong></div>
        <div class="rule"><span class="tiny">MID/FWD assist</span><strong>3 pts</strong></div>
      </div>
      <div class="empty-state">
        <strong>No drafted players yet.</strong>
        <span>Drafted players will appear here by national team.</span>
      </div>
    `;
    return;
  }
  const validTeams = draftedTeams.map(([, team]) => team);
  if (!validTeams.includes(state.scoringTeam)) state.scoringTeam = validTeams[0];
  const selectedTeam = state.scoringTeam;
  panel.innerHTML = `
    <div class="rules-strip">
      <div class="rule"><span class="tiny">DEF goal</span><strong>8 pts</strong></div>
      <div class="rule"><span class="tiny">MID goal</span><strong>5 pts</strong></div>
      <div class="rule"><span class="tiny">FWD goal</span><strong>4 pts</strong></div>
      <div class="rule"><span class="tiny">DEF assist</span><strong>4 pts</strong></div>
      <div class="rule"><span class="tiny">MID/FWD assist</span><strong>3 pts</strong></div>
    </div>
    <div class="scoring-controls">
      <div>
        <label for="scoringTeam">Team To Score</label>
        <select id="scoringTeam">
          ${draftedTeams.map(([, team]) => `<option value="${escapeHtml(team)}" ${team === selectedTeam ? "selected" : ""}>${escapeHtml(team)}</option>`).join("")}
        </select>
      </div>
      <div class="scoring-actions">
        <div class="tiny">Enter goals and assists by match. Points remain even after a team is knocked out.</div>
        ${isAdminUser() ? `<button id="updateScoresBtn" class="primary" type="button" ${UPDATE_ACTIONS_ENABLED ? "" : "disabled"} title="${UPDATE_ACTIONS_ENABLED ? "Update scores" : "Temporarily disabled"}">Update Scores</button>` : ""}
        ${scoreUpdateMessage ? `<div class="score-update-status">${escapeHtml(scoreUpdateMessage)}</div>` : ""}
      </div>
    </div>
    <div class="team-summary-grid">
      ${draftedTeams.map(([group, team]) => {
        const players = roster.filter((player) => player.team === team && draftedPlayerIds.has(player.id));
        const teamPoints = players.reduce((sum, player) => sum + scorePlayer(player), 0);
        const alive = isTeamAlive(team);
        return `<div class="team-summary ${team === selectedTeam ? "active" : ""} ${alive ? "alive" : "eliminated"}">
          <button class="team-summary-main" data-score-team="${escapeHtml(team)}">
            <strong>${escapeHtml(team)}</strong>
            <span>Group ${group} · ${players.length} drafted · ${teamPoints} pts</span>
          </button>
          <button class="team-status-toggle ${alive ? "alive" : "eliminated"}" data-toggle-team-status="${escapeHtml(team)}">${alive ? "Alive" : "Eliminated"}</button>
        </div>`;
      }).join("")}
    </div>
    <div class="teams-grid">
      ${draftedTeams.filter(([, team]) => team === selectedTeam).map(([group, team]) => {
        const players = roster.filter((player) => player.team === team && draftedPlayerIds.has(player.id));
        const teamPoints = players.reduce((sum, player) => sum + scorePlayer(player), 0);
        return `<article class="team-card">
          <div class="team-head">
            <div><h3>${escapeHtml(team)}</h3><div class="tiny">Group ${group} · ${teamPoints} pool points</div></div>
            <select class="status-select" data-team-status="${escapeHtml(team)}">
              ${["Alive", "Eliminated", "Eliminated - group stage", "Eliminated - knockout round"].map((status) => `<option ${state.teamStatus[team] === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </div>
          <div class="scoring-table-wrap">
            <table class="scoring-table">
              <thead>
                <tr>
                  <th>Player</th>
                  ${GAME_COLUMNS.map((game) => `<th>${game.label}</th>`).join("")}
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                ${players.map((player) => {
                  const pick = drafted.get(player.id);
                  const alive = isTeamAlive(player.team);
                  return `<tr class="${alive ? "" : "player-eliminated"}">
                    <td class="scoring-player">
                      <strong>${escapeHtml(player.name)}</strong>
                      <div class="tiny">${player.position} · ${pick ? escapeHtml(nameForParticipant(pick.participantId)) : "Undrafted"} ${alive ? "" : "· team eliminated"}</div>
                      ${alive ? "" : `<span class="badge out">Eliminated</span>`}
                    </td>
                    ${GAME_COLUMNS.map((game) => {
                      const stats = statsForGame(player.id, game.id);
                      return `<td>
                        <div class="game-stat">
                          <label><span>G</span><input type="number" min="0" data-stat="${player.id}:${game.id}:goals" value="${stats.goals}" aria-label="${escapeHtml(player.name)} ${game.label} goals"></label>
                          <label><span>A</span><input type="number" min="0" data-stat="${player.id}:${game.id}:assists" value="${stats.assists}" aria-label="${escapeHtml(player.name)} ${game.label} assists"></label>
                        </div>
                      </td>`;
                    }).join("")}
                    <td><strong>${scorePlayer(player)}</strong></td>
                  </tr>`;
                }).join("")}
              </tbody>
            </table>
          </div>
        </article>`;
      }).join("")}
    </div>
  `;
}

function renderStandings() {
  const standings = state.participants.map((participant) => {
    const picks = state.picks.filter((pick) => pick.participantId === participant.id);
    const points = picks.reduce((sum, pick) => {
      const player = roster.find((item) => item.id === pick.playerId);
      return sum + (player ? scorePlayer(player) : 0);
    }, 0);
    const active = picks.filter((pick) => {
      const player = roster.find((item) => item.id === pick.playerId);
      return player && isTeamAlive(player.team);
    }).length;
    return { ...participant, points, picks: picks.length, active };
  }).sort((a, b) => b.points - a.points || b.active - a.active || a.name.localeCompare(b.name));

  document.getElementById("standings").innerHTML = `
    <div class="standings-list">
      ${standings.map((participant, index) => `<div class="standing-row">
        <span class="rank">${index + 1}</span>
        <div><strong>${escapeHtml(participant.name)}</strong><div class="tiny">${participant.picks}/10 drafted · ${participant.active} still alive</div></div>
        <div><span class="tiny">Points</span><br><strong>${participant.points}</strong></div>
      </div>`).join("")}
    </div>
  `;
}

function renderSquads() {
  const panel = document.getElementById("squads");
  const drafted = draftedMap();
  const picksByParticipant = new Map(state.participants.map((participant) => [participant.id, []]));
  state.picks.forEach((pick) => {
    const player = roster.find((item) => item.id === pick.playerId);
    if (player) picksByParticipant.get(pick.participantId)?.push({ pick, player });
  });

  panel.innerHTML = `
    <div class="squads-grid">
      ${state.participants.map((participant) => {
        const rostered = picksByParticipant.get(participant.id) || [];
        const totalPoints = rostered.reduce((sum, item) => sum + scorePlayer(item.player), 0);
        const activeCount = rostered.filter((item) => isTeamAlive(item.player.team)).length;
        return `<article class="squad-card">
          <div class="squad-head">
            <div>
              <h3>${escapeHtml(participant.name)}</h3>
              <div class="tiny">${rostered.length}/10 drafted · ${activeCount} still alive · ${totalPoints} pts</div>
            </div>
          </div>
          ${rostered.length ? `
            <div class="squad-table-wrap">
              <table class="squad-table">
                <thead>
                  <tr>
                    <th>Player</th>
                    ${GAME_COLUMNS.map((game) => `<th>${game.label}</th>`).join("")}
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${rostered.map(({ pick, player }) => `<tr>
                    <td class="squad-player">
                      <strong>${escapeHtml(player.name)}</strong>
                      <div class="tiny">${escapeHtml(player.team)} · ${player.position} · Pick ${pick.pickNumber}</div>
                    </td>
                    ${GAME_COLUMNS.map((game) => {
                      const stats = statsForGame(player.id, game.id);
                      const points = scorePlayerGame(player, game.id);
                      return `<td>
                        <div class="round-score">
                          <strong>${points}</strong>
                          <span>${stats.goals}G · ${stats.assists}A</span>
                        </div>
                      </td>`;
                    }).join("")}
                    <td><strong>${scorePlayer(player)}</strong></td>
                    <td><span class="badge ${isTeamAlive(player.team) ? "alive" : "out"}">${escapeHtml(state.teamStatus[player.team] || "Alive")}</span></td>
                  </tr>`).join("")}
                </tbody>
              </table>
            </div>
          ` : `<div class="empty-state"><strong>No picks yet.</strong><span>This squad will fill in during the draft.</span></div>`}
        </article>`;
      }).join("")}
    </div>
  `;
}

function renderRules() {
  document.getElementById("rules").innerHTML = `
    <div class="rules-page">
      <section class="rules-hero">
        <div>
          <p class="eyebrow">Official Pool Rules</p>
          <h2>Tormenta de Goles</h2>
        </div>
        <p>Draft players, score points while their countries survive, and try to finish the World Cup at the top of the standings.</p>
      </section>

      <section class="rules-section">
        <h3>Draft Setup</h3>
        <ul class="rules-list">
          <li>The pool can include up to 10 participants.</li>
          <li>Each participant drafts 10 players.</li>
          <li>Before drafting begins, the participants are locked, the draft order is randomized, and then the draft order is locked.</li>
          <li>The draft is a snake draft, so the order reverses every round.</li>
          <li>Only the participant on the clock can make the current pick.</li>
          <li>Glenn Salzman can enter or reset picks as commissioner.</li>
        </ul>
      </section>

      <section class="rules-section">
        <h3>Drafting Players</h3>
        <ul class="rules-list">
          <li>Only available players can be drafted.</li>
          <li>Once a player is drafted, that player belongs to the participant who made the pick.</li>
          <li>The Draft Queue can show drafted players or hide them, depending on the Hide Drafted toggle.</li>
          <li>Each signed-in participant has their own private queue. Other participants cannot see it.</li>
          <li>If someone else drafts a player in your queue, that player is removed from your queue.</li>
        </ul>
      </section>

      <section class="rules-section">
        <h3>Scoring</h3>
        <div class="rules-table-wrap">
          <table class="rules-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Goal</th>
                <th>Assist</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Defender</td>
                <td>8 points</td>
                <td>4 points</td>
              </tr>
              <tr>
                <td>Midfielder</td>
                <td>5 points</td>
                <td>3 points</td>
              </tr>
              <tr>
                <td>Forward</td>
                <td>4 points</td>
                <td>3 points</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="rules-note">Goals and assists are entered by game: Group 1, Group 2, Group 3, Round of 32, Round of 16, Quarterfinal, Semifinal, Final, and Third Place.</p>
      </section>

      <section class="rules-section">
        <h3>Eliminations</h3>
        <ul class="rules-list">
          <li>When a player's country is eliminated from the World Cup, that player is eliminated from the pool.</li>
          <li>Eliminated players keep all points they already scored.</li>
          <li>Eliminated players cannot earn additional points after their country is out.</li>
          <li>Country status is controlled on the Teams & Scoring tab by changing a team from Alive to Eliminated.</li>
        </ul>
      </section>

      <section class="rules-section">
        <h3>Standings</h3>
        <ul class="rules-list">
          <li>Standings are ranked by total points.</li>
          <li>Total points include points from both active and eliminated players.</li>
          <li>The standings also show how many drafted players each participant still has alive.</li>
        </ul>
      </section>

      <section class="rules-section">
        <h3>Commissioner Controls</h3>
        <ul class="rules-list">
          <li>Glenn Salzman is the commissioner/admin user.</li>
          <li>Only the commissioner can make picks for another participant or reset the draft.</li>
          <li>Only the commissioner can use Update World Cup Rosters after official rosters are available.</li>
        </ul>
      </section>
    </div>
  `;
}

function draftPlayer(playerId) {
  const info = currentPickInfo();
  if (!state.draftOrderLocked) {
    alert("Lock the draft order before drafting players.");
    return;
  }
  if (!canDraftCurrentPick()) {
    alert(draftPermissionMessage());
    return;
  }
  if (!info || draftedMap().has(playerId)) return;
    state.picks.push({
    pickNumber: info.pickIndex + 1,
    round: info.round,
    participantId: info.participant.id,
    playerId
  });
  Object.keys(state.queues).forEach((participantId) => {
    state.queues[participantId] = (state.queues[participantId] || []).filter((id) => id !== playerId);
  });
  saveSharedState();
  render();
}

function lockParticipants() {
  if (state.picks.length) return;
  state.participantsLocked = true;
  state.draftOrder = normalizeDraftOrder(state.draftOrder, state.participants.map((participant) => participant.id));
  saveSharedState();
  render();
}

function randomizeDraftOrder() {
  if (!state.participantsLocked || state.draftOrderLocked || state.picks.length) return;
  const ids = state.participants.map((participant) => participant.id);
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [ids[index], ids[swapIndex]] = [ids[swapIndex], ids[index]];
  }
  state.draftOrder = ids;
  saveSharedState();
  render();
}

function lockDraftOrder() {
  if (!state.participantsLocked || state.picks.length) return;
  state.draftOrder = normalizeDraftOrder(state.draftOrder, state.participants.map((participant) => participant.id));
  state.draftOrderLocked = true;
  saveSharedState();
  render();
}

function animateDraftButton(button, playerId) {
  button.classList.remove("draft-clicked");
  void button.offsetWidth;
  button.classList.add("draft-clicked");
  window.setTimeout(() => draftPlayer(playerId), 180);
}

function resetLastPick() {
  if (!isAdminUser()) return;
  if (!state.picks.length) return;
  state.picks.pop();
  saveSharedState();
  render();
}

function resetEntireDraft() {
  if (!isAdminUser()) return;
  const currentLogin = state.loggedInUserId;
  const currentUser = state.currentUserId;
  state.picks = [];
  state.queues = Object.fromEntries(state.participants.map((participant) => [participant.id, []]));
  state.stats = {};
  state.teamStatus = Object.fromEntries(TEAMS.map(([, team]) => [team, "Alive"]));
  state.participantsLocked = false;
  state.draftOrder = state.participants.map((participant) => participant.id);
  state.draftOrderLocked = false;
  state.scoringTeam = TEAMS[0][1];
  state.loggedInUserId = currentLogin;
  state.currentUserId = currentUser;
  saveSharedState();
  render();
}

function nameForParticipant(id) {
  return state.participants.find((participant) => participant.id === id)?.name || "Unknown";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

document.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-tab]");
  if (tab) {
    state.activeTab = tab.dataset.tab;
    render();
    return;
  }
  const draftButton = event.target.closest("[data-draft]");
  if (draftButton) {
    animateDraftButton(draftButton, draftButton.dataset.draft);
    return;
  }
  const sortButton = event.target.closest("[data-sort-queue]");
  if (sortButton) {
    const key = sortButton.dataset.sortQueue;
    const currentSort = state.queueSort || { key: "player", direction: "asc" };
    state.queueSort = {
      key,
      direction: currentSort.key === key && currentSort.direction === "asc" ? "desc" : "asc"
    };
    render();
  }
  const scoreTeamButton = event.target.closest("[data-score-team]");
  if (scoreTeamButton) {
    state.scoringTeam = scoreTeamButton.dataset.scoreTeam;
    render();
  }
  const teamStatusToggle = event.target.closest("[data-toggle-team-status]");
  if (teamStatusToggle) {
    const team = teamStatusToggle.dataset.toggleTeamStatus;
    state.teamStatus[team] = isTeamAlive(team) ? "Eliminated" : "Alive";
    state.scoringTeam = team;
    saveSharedState();
    render();
  }
  const queueButton = event.target.closest("[data-queue]");
  if (queueButton) {
    const list = new Set(state.queues[state.currentUserId] || []);
    list.has(queueButton.dataset.queue) ? list.delete(queueButton.dataset.queue) : list.add(queueButton.dataset.queue);
    state.queues[state.currentUserId] = [...list];
    saveSharedState();
    render();
  }
  const removeQueueButton = event.target.closest("[data-remove-queue]");
  if (removeQueueButton) {
    state.queues[state.currentUserId] = (state.queues[state.currentUserId] || []).filter((id) => id !== removeQueueButton.dataset.removeQueue);
    saveSharedState();
    render();
  }
  if (event.target.id === "changeUserBtn") {
    const previousLogin = state.loggedInUserId;
    state.loggedInUserId = null;
    clearActiveLogin(previousLogin);
    render();
  }
  const loginParticipantButton = event.target.closest("[data-login-participant]");
  if (loginParticipantButton) {
    if (state.loggedInUserId && state.loggedInUserId !== loginParticipantButton.dataset.loginParticipant) clearActiveLogin(state.loggedInUserId);
    state.loggedInUserId = loginParticipantButton.dataset.loginParticipant;
    state.currentUserId = state.loggedInUserId;
    touchActiveLogin(state.loggedInUserId);
    render();
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-participant-name]")) {
    const participant = state.participants.find((item) => item.id === event.target.dataset.participantName);
    if (participant) participant.name = event.target.value;
    saveState();
    saveSharedState();
  }
  if (event.target.id === "searchPlayers") {
    state.filters.search = event.target.value;
    renderQueueRowsOnly();
    saveState();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "participantCount") setParticipantCount(Number(event.target.value));
  if (event.target.id === "teamFilter") state.filters.team = event.target.value;
  if (event.target.id === "positionFilter") state.filters.position = event.target.value;
  if (event.target.id === "viewModeToggle") state.viewMode = event.target.checked ? "mobile" : "desktop";
  if (event.target.matches("[data-toggle-drafted]")) state.filters.hideDrafted = event.target.checked;
  if (event.target.id === "scoringTeam") state.scoringTeam = event.target.value;
  if (event.target.matches("[data-team-status]")) {
    state.teamStatus[event.target.dataset.teamStatus] = event.target.value;
    saveSharedState();
  }
  if (event.target.matches("[data-stat]")) {
    const [id, gameId, key] = event.target.dataset.stat.split(":");
    setGameStat(id, gameId, key, event.target.value);
  }
  render();
});

document.getElementById("saveParticipantsBtn").addEventListener("click", render);
document.getElementById("lockParticipantsBtn").addEventListener("click", lockParticipants);
document.getElementById("randomizeOrderBtn").addEventListener("click", randomizeDraftOrder);
document.getElementById("lockOrderBtn").addEventListener("click", lockDraftOrder);
document.getElementById("resetDraftBtn").addEventListener("click", () => {
  if (!isAdminUser()) return;
  document.getElementById("resetDraftDialog").showModal();
});
document.getElementById("resetLastPickBtn").addEventListener("click", () => {
  document.getElementById("resetDraftDialog").close();
  resetLastPick();
});
document.getElementById("resetEntireDraftBtn").addEventListener("click", () => {
  if (!confirm("Reset the entire draft board, queues, scoring, and team statuses?")) return;
  document.getElementById("resetDraftDialog").close();
  resetEntireDraft();
});
document.addEventListener("click", (event) => {
  if (!UPDATE_ACTIONS_ENABLED && (event.target.id === "updateRostersBtn" || event.target.id === "updateScoresBtn")) return;
  if (event.target.id === "updateRostersBtn" && isAdminUser()) updateOfficialRosters();
  if (event.target.id === "updateScoresBtn" && isAdminUser()) updateScoresFromProvider();
});

async function refreshSharedState() {
  const activeElement = document.activeElement;
  if (activeElement?.matches?.("input, textarea, select")) return;
  const loaded = await loadSharedState();
  if (!loaded) return;
  render();
}

function startLoginPresence() {
  window.clearInterval(activeLoginTimer);
  window.clearInterval(sharedRefreshTimer);
  activeLoginTimer = window.setInterval(() => {
    if (state.loggedInUserId) touchActiveLogin(state.loggedInUserId);
  }, ACTIVE_LOGIN_HEARTBEAT_MS);
  sharedRefreshTimer = window.setInterval(refreshSharedState, SHARED_STATE_REFRESH_MS);
}

initializeRoster().then(async () => {
  await loadSharedState();
  if (state.loggedInUserId) touchActiveLogin(state.loggedInUserId);
  startLoginPresence();
  render();
});
