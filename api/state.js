import { neon } from "@neondatabase/serverless";

const STATE_ID = "default";

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
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

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return json(res, 503, { error: "DATABASE_URL is not configured." });
  }

  const sql = neon(process.env.DATABASE_URL);
  await ensureTable(sql);

  if (req.method === "GET") {
    const rows = await sql`SELECT state, updated_at FROM league_state WHERE id = ${STATE_ID}`;
    return json(res, 200, rows[0] || { state: null, updated_at: null });
  }

  if (req.method === "POST") {
    const body = await readBody(req);
    if (!body || typeof body.state !== "object" || Array.isArray(body.state)) {
      return json(res, 400, { error: "Expected a state object." });
    }

    const rows = await sql`
      INSERT INTO league_state (id, state, updated_at)
      VALUES (${STATE_ID}, ${JSON.stringify(body.state)}::jsonb, now())
      ON CONFLICT (id)
      DO UPDATE SET state = EXCLUDED.state, updated_at = now()
      RETURNING updated_at
    `;
    return json(res, 200, { ok: true, updated_at: rows[0].updated_at });
  }

  res.setHeader("Allow", "GET, POST");
  return json(res, 405, { error: "Method not allowed." });
}
