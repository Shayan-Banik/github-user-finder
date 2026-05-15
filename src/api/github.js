const BASE = "https://api.github.com";

async function request(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const message =
      res.status === 404
        ? "User not found"
        : res.status === 403
          ? "API rate limit reached. Try again later."
          : "Something went wrong";
    throw new Error(message);
  }
  return res.json();
}

export function searchUsers(query, perPage = 6) {
  const q = encodeURIComponent(`${query} in:login`);
  return request(`${BASE}/search/users?q=${q}&per_page=${perPage}`);
}

export function getUser(username) {
  return request(`${BASE}/users/${encodeURIComponent(username)}`);
}

export function getUserRepos(username, perPage = 5) {
  return request(
    `${BASE}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${perPage}`,
  );
}
