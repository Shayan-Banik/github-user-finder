export function UserStats({ user }) {
  const stats = [
    { label: "Repos", value: user.public_repos },
    { label: "Followers", value: user.followers },
    { label: "Following", value: user.following },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 rounded-xl bg-canvas/60 p-1">
      {stats.map(({ label, value }) => (
        <div key={label} className="rounded-lg px-3 py-3 text-center">
          <p className="text-xs text-muted">{label}</p>
          <p className="mt-0.5 text-lg font-semibold tabular-nums">{value}</p>
        </div>
      ))}
    </div>
  );
}
