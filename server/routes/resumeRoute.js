const express = require("express");
const router = express.Router();
const { getProfile, getRepos, getResume } = require("../controllers");
const passport = require("passport");

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email", "repo"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

// API routes
router.get("/profile", getProfile);
router.get("/repos", getRepos);
router.get("/resume", getResume);

module.exports = router;
