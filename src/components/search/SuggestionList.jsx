import { Spinner } from "../ui/Spinner";

export function SuggestionList({
  suggestions,
  loading,
  activeIndex,
  onSelect,
  listId,
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted">
        <Spinner />
        Searching users…
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <p className="px-4 py-3 text-sm text-muted">No matching users found.</p>
    );
  }

  return (
    <ul id={listId} role="listbox" className="max-h-64 overflow-y-auto py-1">
      {suggestions.map((item, index) => (
        <li key={item.id} role="presentation">
          <button
            type="button"
            role="option"
            aria-selected={index === activeIndex}
            id={`${listId}-option-${index}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect(item.login)}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition ${
              index === activeIndex
                ? "bg-accent/15 text-white"
                : "text-white/90 hover:bg-white/5"
            }`}
          >
            <img
              src={item.avatar_url}
              alt=""
              className="size-8 rounded-full ring-1 ring-white/10"
            />
            <span className="font-medium">{item.login}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
