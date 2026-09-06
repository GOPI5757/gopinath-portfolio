/**
 * Optional automatic-contact endpoint for Node.js 18+ and Resend.
 * 1. Copy .env.example to .env and fill the values.
 * 2. Run: node --env-file=.env contact-server.example.js
 * 3. In config/contact.js set deliveryMode to "endpoint" and use this server URL.
 *
 * This is intentionally a small example. Put it behind HTTPS and restrict
 * ALLOWED_ORIGIN to your deployed portfolio origin before production use.
 */
import http from "node:http";

const port = Number(process.env.PORT || 8787);
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:8080";
const recipient = process.env.CONTACT_RECIPIENT;
const sender = process.env.CONTACT_SENDER;
const apiKey = process.env.RESEND_API_KEY;

function respond(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(payload));
}

http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") return respond(response, 204, {});
  if (request.method !== "POST" || request.url !== "/api/contact") return respond(response, 404, { error: "Not found" });
  if (!recipient || !sender || !apiKey) return respond(response, 500, { error: "Server email settings are incomplete" });

  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
    if (body.length > 10_000) request.destroy();
  });
  request.on("end", async () => {
    try {
      const { name = "", email = "", message = "" } = JSON.parse(body);
      if (![name, email, message].every((value) => typeof value === "string" && value.trim())) return respond(response, 400, { error: "Name, email and message are required" });
      if (name.length > 160 || email.length > 320 || message.length > 5000) return respond(response, 400, { error: "Message is too long" });

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: sender,
          to: [recipient],
          reply_to: email,
          subject: `Portfolio message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });
      if (!resendResponse.ok) throw new Error("Email provider request failed");
      return respond(response, 200, { ok: true });
    } catch {
      return respond(response, 400, { error: "Unable to send message" });
    }
  });
}).listen(port, () => console.log(`Contact endpoint listening on http://localhost:${port}/api/contact`));
