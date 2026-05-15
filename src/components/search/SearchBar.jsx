import { useEffect, useId, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useGitHubSearch } from "../../hooks/useGitHubSearch";
import { Spinner } from "../ui/Spinner";
import { SuggestionList } from "./SuggestionList";

export function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const listId = useId();

  const { suggestions, loading: searching, hasQuery } = useGitHubSearch(query);

  const showDropdown = open && query.trim().length >= 2;

  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectUser = (username) => {
    setQuery(username);
    setOpen(false);
    onSearch(username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value =
      activeIndex >= 0 && suggestions[activeIndex]
        ? suggestions[activeIndex].login
        : query.trim();
    if (!value) return;
    selectUser(value);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === "Escape") setOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectUser(suggestions[activeIndex].login);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const clear = () => {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-2xl border border-white/10 bg-surface/80 p-2 shadow-xl shadow-black/20 backdrop-blur-md ring-1 ring-white/5 focus-within:border-accent/40 focus-within:ring-accent/20"
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
          <FiSearch className="size-5 shrink-0 text-accent" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Type a GitHub username…"
            autoComplete="off"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={showDropdown ? listId : undefined}
            aria-activedescendant={
              activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
            }
            className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={clear}
              className="rounded-lg p-1.5 text-muted transition hover:bg-white/10 hover:text-white"
              aria-label="Clear search"
            >
              <FiX className="size-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <Spinner className="border-t-white" /> : "Search"}
        </button>
      </form>

      {showDropdown && (
        <div
          className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/40 backdrop-blur-xl"
          role="presentation"
        >
          {hasQuery && (
            <SuggestionList
              listId={listId}
              suggestions={suggestions}
              loading={searching}
              activeIndex={activeIndex}
              onSelect={selectUser}
            />
          )}
        </div>
      )}
    </div>
  );
}
