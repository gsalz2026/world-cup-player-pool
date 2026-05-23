# World Cup Player Pool

A local draft-and-scoring app for a World Cup player pool.

## Run locally

From this folder:

```sh
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`. If that port is already in use, choose another port, for example:

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4174/`.

## Roster data

The app includes all 48 World Cup teams and 26 roster slots per team so the draft can be tested immediately. Some announced/provisional players are seeded for the major teams, and the app will automatically use `data/players.json` if present.

Final World Cup squad lists are still being announced and finalized in May/June 2026. To refresh the data once a reliable squad table is available:

```sh
node scripts/import-worldcup-squads.mjs
```

That writes `data/players.json`, which the app loads on startup when served over HTTP.
