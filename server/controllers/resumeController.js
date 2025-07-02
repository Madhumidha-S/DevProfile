require("dotenv").config();
const logger = require("../utils/logger");
const db = require("../utils/database");

const { fetchProfile, fetchRepos } = require("../services/githubService");
const { generateResume } = require("../services/resumeBuilder");

exports.getProfile = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const profile = await fetchProfile(req.user.accessToken);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.getRepos = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const repos = await fetchRepos(req.user.accessToken);
    res.json(repos);
  } catch (err) {
    next(err);
  }
};

exports.getResume = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const profile = await fetchProfile(req.user.accessToken);
    const repos = await fetchRepos(req.user.accessToken);

    const resume = await generateResume(profile, repos);
    res.json(resume);
  } catch (err) {
    next(err);
  }
};
