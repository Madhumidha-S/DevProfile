const axios = require("axios");

exports.fetchProfile = async (token) => {
  const res = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

exports.fetchRepos = async (token) => {
  const res = await axios.get(
    "https://api.github.com/user/repos?per_page=100",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
