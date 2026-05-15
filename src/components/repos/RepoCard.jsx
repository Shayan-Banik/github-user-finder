import { FiStar } from "react-icons/fi";

export function RepoCard({ repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-xl border border-white/5 bg-canvas/50 p-4 transition hover:border-accent/30 hover:bg-canvas/80"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="truncate font-semibold text-accent group-hover:underline">
          {repo.name}
        </h4>
        {repo.stargazers_count > 0 && (
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted">
            <FiStar className="size-3.5" aria-hidden />
            {repo.stargazers_count}
          </span>
        )}
      </div>
      {repo.description && (
        <p className="mt-2 line-clamp-2 text-sm text-white/60">
          {repo.description}
        </p>
      )}
      {repo.language && (
        <p className="mt-2 text-xs text-muted">{repo.language}</p>
      )}
    </a>
  );
}
