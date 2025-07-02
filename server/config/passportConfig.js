const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const db = require("../utils/database");
require("dotenv").config();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const github_id = profile.id;
        const username = profile.username;
        const name = profile.displayName;
        const avatar_url = profile.photos?.[0]?.value || "";
        const profile_url = profile.profileUrl;
        console.log("GitHub Client ID:", process.env.GITHUB_CLIENT_ID);
        await db.query(
          `INSERT INTO users (github_id, username, name, avatar_url, profile_url, access_token)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (github_id)
           DO UPDATE SET access_token = EXCLUDED.access_token, name = EXCLUDED.name, avatar_url = EXCLUDED.avatar_url, profile_url = EXCLUDED.profile_url`,
          [github_id, username, name, avatar_url, profile_url, accessToken]
        );

        profile.accessToken = accessToken;
        return done(null, profile);
      } catch (err) {
        console.error("DB error in GitHubStrategy:", err.message);
        return done(err, null);
      }
    }
  )
);
