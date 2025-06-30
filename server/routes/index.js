const express = require("express");
const resumeRoutes = require("./resumeRoute");
const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

router.use("/", resumeRoutes);

module.exports = router;
