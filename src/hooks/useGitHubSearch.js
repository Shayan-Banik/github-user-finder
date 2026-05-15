import { useEffect, useState } from "react";
import { searchUsers } from "../api/github";
import { useDebounce } from "./useDebounce";

export function useGitHubSearch(query) {
  const debounced = useDebounce(query.trim(), 350);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (debounced.length < 2) {
      setSuggestions([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    searchUsers(debounced)
      .then((data) => {
        if (!cancelled) setSuggestions(data.items ?? []);
      })
      .catch((err) => {
        if (!cancelled) {
          setSuggestions([]);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debounced]);

  return { suggestions, loading, error, hasQuery: debounced.length >= 2 };
}
