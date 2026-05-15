import { UserMeta } from "./UserMeta";
import { UserStats } from "./UserStats";

export function UserProfile({ user }) {
  const joined = new Date(user.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="rounded-2xl border border-white/10 bg-surface/80 p-5 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-5 sm:flex-row">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="mx-auto size-24 shrink-0 rounded-2xl ring-2 ring-white/10 sm:mx-0"
        />
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">{user.name || user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-accent hover:underline"
              >
                @{user.login}
              </a>
            </div>
            <p className="text-xs text-muted">Joined {joined}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {user.bio || "No bio provided."}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <UserStats user={user} />
      </div>
      <div className="mt-4">
        <UserMeta user={user} />
      </div>
    </article>
  );
}
