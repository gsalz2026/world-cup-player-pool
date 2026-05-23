import { writeFile, mkdir } from "node:fs/promises";

const source = "https://en.wikipedia.org/api/rest_v1/page/html/2026_FIFA_World_Cup_squads";
const response = await fetch(source);

if (!response.ok) {
  throw new Error(`Could not fetch squads: ${response.status} ${response.statusText}`);
}

const html = await response.text();
const teams = [...html.matchAll(/<h3[^>]*id="([^"]+)"[\s\S]*?<\/h3>([\s\S]*?)(?=<h3|<h2|$)/g)];
const players = [];

for (const [, rawTeam, section] of teams) {
  const team = clean(rawTeam);
  const rows = [...section.matchAll(/<tr[\s\S]*?<\/tr>/g)];
  for (const [row] of rows) {
    const cells = [...row.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map(([, cell]) => clean(cell));
    const numberIndex = cells.findIndex((cell) => /^\d{1,2}$/.test(cell));
    if (numberIndex === -1) continue;
    const position = cells.find((cell) => ["GK", "DF", "MF", "FW"].includes(cell));
    const name = cells.find((cell) => cell.length > 2 && !/^\d{1,2}$/.test(cell) && !["GK", "DF", "MF", "FW"].includes(cell));
    if (!name || !position) continue;
    players.push({
      id: slug(`${team}-${name}`),
      name,
      team,
      group: "",
      position: position.replace("DF", "DEF").replace("MF", "MID").replace("FW", "FWD"),
      source: "Wikipedia squad table"
    });
  }
}

await mkdir(new URL("../data/", import.meta.url), { recursive: true });
await writeFile(new URL("../data/players.json", import.meta.url), JSON.stringify({
  updatedAt: new Date().toISOString(),
  source,
  players
}, null, 2));

console.log(`Wrote ${players.length} players to data/players.json`);

function clean(value) {
  return value
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
