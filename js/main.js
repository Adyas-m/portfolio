// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Fetch GitHub stats (will update later with real username)
async function updateGitHubStats() {
  try {
    const username = 'yourusername'; // UPDATE THIS
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    
    document.getElementById('github-stars').textContent = await getTotalStars(username);
  } catch (error) {
    console.log('GitHub stats will be updated once repos are created');
  }
}

async function getTotalStars(username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await response.json();
  return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

// Call on page load (will work once repos exist)
// updateGitHubStats();