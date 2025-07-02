const resumeController = require("./resumeController");

module.exports = {
  getProfile: resumeController.getProfile,
  getRepos: resumeController.getRepos,
  getResume: resumeController.getResume,
};
