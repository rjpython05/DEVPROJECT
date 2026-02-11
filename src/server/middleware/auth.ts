import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface MondaySession {
  accountId: string;
  userId: string;
  aud: string;
  exp: number;
  iat: number;
}

declare global {
  namespace Express {
    interface Request {
      session?: MondaySession;
    }
  }
}

/**
 * Middleware to verify Monday.com JWT tokens on incoming integration requests.
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: "No authorization token provided" });
    return;
  }

  const signingSecret = process.env.MONDAY_SIGNING_SECRET;
  if (!signingSecret) {
    res.status(500).json({ error: "Server signing secret not configured" });
    return;
  }

  try {
    const decoded = jwt.verify(token, signingSecret) as MondaySession;
    req.session = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
