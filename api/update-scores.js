export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "Method not allowed." }));
  }

  res.setHeader("Content-Type", "application/json");

  const provider = process.env.SCORE_PROVIDER || "sportmonks";
  const token = process.env.SPORTMONKS_API_TOKEN || process.env.FOOTBALL_API_TOKEN || "";

  if (!token) {
    res.statusCode = 501;
    return res.end(JSON.stringify({
      error: `Score automation is ready, but ${provider} credentials are not configured yet. Add SPORTMONKS_API_TOKEN or FOOTBALL_API_TOKEN in Vercel, then we can connect live match events.`
    }));
  }

  res.statusCode = 501;
  return res.end(JSON.stringify({
    error: "Score provider token found, but the event mapping step still needs the provider-specific fixture/event IDs."
  }));
}
