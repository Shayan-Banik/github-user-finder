import { useCallback, useState } from "react";
import { getUser, getUserRepos } from "../api/github";

export function useGitHubUser() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async (username) => {
    const name = username.trim();
    if (!name) return;

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const [profile, repositories] = await Promise.all([
        getUser(name),
        getUserRepos(name),
      ]);
      setUser(profile);
      setRepos(repositories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setUser(null);
    setRepos([]);
    setError(null);
  }, []);

  return { user, repos, loading, error, fetchUser, clear };
}
