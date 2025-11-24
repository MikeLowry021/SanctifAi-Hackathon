import type { Express, RequestHandler } from "express";

// No-op auth setup for Bolt demo build
export async function setupAuth(app: Express) {
  // Auth is disabled in this hackathon build. All endpoints that used to
  // require authentication should be unused from the frontend.
  return;
}

// Simple middleware that always returns 401 if accidentally used.
export const isAuthenticated: RequestHandler = (_req, res) => {
  return res.status(401).json({ message: "Auth disabled in this demo build" });
};
