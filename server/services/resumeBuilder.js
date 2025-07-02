// services/resumeBuilder.js

exports.generateResume = async (profile, repos) => {
  return {
    basics: {
      name: profile.name || profile.login,
      username: profile.login,
      email: profile.email || "Not public",
      location: profile.location || "Not specified",
      bio: profile.bio || "",
      avatar: profile.avatar_url,
      github: profile.html_url,
    },
    stats: {
      totalRepos: repos.length,
      topLanguages: getTopLanguages(repos),
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    },
    projects: repos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updated_at: repo.updated_at,
    })),
  };
};

// helper
function getTopLanguages(repos) {
  const langCount = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });
  return Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang);
}
