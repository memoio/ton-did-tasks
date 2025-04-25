// pages/api/create-session.js
import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { identifier } = req.body;

    // Validate the identifier (e.g., against a database)
    if (!identifier) {
      return res.status(400).json({ error: "Invalid identifier" });
    }

    // Create a session token
    const token = Buffer.from(`${identifier}-${Date.now()}`).toString("base64");

    // Set the session token as a cookie
    res.setHeader(
      "Set-Cookie",
      serialize("sessionToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })
    );

    res.status(200).json({ message: "Session created", token });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}