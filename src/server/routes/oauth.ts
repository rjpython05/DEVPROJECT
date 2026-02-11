import { Router } from "express";

const router = Router();

/**
 * GET /oauth/authorize
 * Redirects user to Monday.com OAuth page.
 */
router.get("/authorize", (_req, res) => {
  const clientId = process.env.MONDAY_CLIENT_ID;
  const appUrl = process.env.APP_URL || "http://localhost:8080";

  if (!clientId) {
    res.status(500).json({ error: "MONDAY_CLIENT_ID not configured" });
    return;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${appUrl}/oauth/callback`,
  });

  res.redirect(`https://auth.monday.com/oauth2/authorize?${params.toString()}`);
});

/**
 * GET /oauth/callback
 * Handles the OAuth callback from Monday.com.
 * Exchanges the authorization code for an access token.
 */
router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      res.status(400).json({ error: "Authorization code not provided" });
      return;
    }

    const clientId = process.env.MONDAY_CLIENT_ID;
    const clientSecret = process.env.MONDAY_CLIENT_SECRET;
    const appUrl = process.env.APP_URL || "http://localhost:8080";

    if (!clientId || !clientSecret) {
      res.status(500).json({ error: "OAuth credentials not configured" });
      return;
    }

    const tokenResponse = await fetch("https://auth.monday.com/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${appUrl}/oauth/callback`,
        code: code as string,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token exchange failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json() as { access_token: string; token_type: string };

    // In production, store this token securely (e.g., Monday Storage SDK)
    console.log("[DevProject] OAuth token received successfully");

    res.json({
      success: true,
      message: "Authentication successful. You can close this window.",
      token_type: tokenData.token_type,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
