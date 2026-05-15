import { FiBriefcase, FiLink, FiMapPin, FiTwitter } from "react-icons/fi";

const items = [
  { key: "location", icon: FiMapPin, get: (u) => u.location },
  { key: "company", icon: FiBriefcase, get: (u) => u.company },
  {
    key: "blog",
    icon: FiLink,
    get: (u) => u.blog,
    href: (u) => (u.blog?.startsWith("http") ? u.blog : `https://${u.blog}`),
  },
  {
    key: "twitter",
    icon: FiTwitter,
    get: (u) => u.twitter_username && `@${u.twitter_username}`,
    href: (u) =>
      u.twitter_username && `https://twitter.com/${u.twitter_username}`,
  },
];

export function UserMeta({ user }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => {
        const { key, get, href } = item;
        const Icon = item.icon;
        const value = get(user);
        const link = href?.(user);
        const display = value || "—";

        return (
          <div
            key={key}
            className="flex items-center gap-2 rounded-lg bg-canvas/40 px-3 py-2 text-sm text-white/70"
          >
            <Icon className="size-4 shrink-0 text-accent" aria-hidden />
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="truncate hover:text-accent"
              >
                {display}
              </a>
            ) : (
              <span className="truncate">{display}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
