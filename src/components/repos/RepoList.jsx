import { RepoCard } from "./RepoCard";

export function RepoList({ repos }) {
  if (!repos.length) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
        Latest repositories
      </h3>
      <div className="grid gap-3">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
