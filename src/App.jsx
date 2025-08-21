import React, { useState } from "react";
import {
  FiSearch,
  FiMapPin,
  FiLink,
  FiTwitter,
  FiBriefcase,
} from "react-icons/fi";
import "./index.css"

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  // Fetch profile
  const getUserProfile = async (username) => {
    try {
      let res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");
      let data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  // Fetch repos
  const getRepos = async (username) => {
    try {
      let res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated`
      );
      if (!res.ok) throw new Error("Failed to fetch repos");
      let data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  // Search handler(on submit)
  const submitHandlerRepo = async (e) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      alert("Please enter a username");
      return;
    }

    try {
      setError(null);
      setUser(null);
      setRepos([]);

      let userData = await getUserProfile(username);
      setUser(userData);

      let repoData = await getRepos(username);
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141D2F] p-6 text-white">
      <div className="w-full max-w-xl bg-[#1F2A48] rounded-2xl p-6 shadow-lg">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
               font-bold rounded animate-pulse text-center px-2">Github User Finder</h1>
        </header>
        <form
          onSubmit={submitHandlerRepo}
          className="flex flex-col sm:flex-row items-stretch sm:items-center 
             bg-[#141D2F] rounded-xl px-3 py-2 mb-6 gap-3"
        >
          <div className="flex items-center flex-1">
            <FiSearch className="text-blue-500 text-lg mr-2" />
            <input
              type="text"
              placeholder="Search GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent outline-none placeholder-gray-400 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold 
               hover:bg-blue-700 transition animate-pulse w-full sm:w-auto"
          >
            Search
          </button>
        </form>
        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        {user && (
          <div className="bg-[#141D2F] rounded-xl p-5">
            <div className="flex gap-5">
              {/* Avatar */}
              <img
                src={user.avatar_url}
                alt="avatar"
                className="w-20 h-20 rounded-full animate-pulse"
              />

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h2 className="text-lg font-bold">{user.name || "No Name"}</h2>
                  <p className="text-gray-400 text-xs">
                    Joined {new Date(user.created_at).toDateString()}
                  </p>
                </div>
                <p className="text-blue-400 text-sm">@{user.login}</p>
                <p className="mt-2 text-gray-400 text-sm">
                  {user.bio || "This profile has no bio"}
                </p>
              </div>
            </div>

            <div className="bg-[#1F2A48] rounded-lg flex justify-around py-3 mt-5 text-center">
              <div>
                <p className="text-xs text-gray-400">Repos</p>
                <p className="text-base font-bold">{user.public_repos}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Followers</p>
                <p className="text-base font-bold">{user.followers}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Following</p>
                <p className="text-base font-bold">{user.following}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <FiMapPin /> {user.location || "Not Available"}
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FiTwitter /> {user.twitter_username || "Not Available"}
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FiLink />{" "}
                <a
                  href={user.blog || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate"
                >
                  {user.blog || "Not Available"}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FiBriefcase /> {user.company || "Not Available"}
              </div>
            </div>
          </div>
        )}

        {repos.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">Repositories</h3>
            <div className="grid gap-3 max-h-60 overflow-y-auto pr-2">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-[#1F2A48] p-3 rounded-lg hover:bg-[#2C3A5A] transition"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 font-semibold"
                  >
                    {repo.name}
                  </a>
                  <p className="text-xs text-gray-400">{repo.description || ""}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
