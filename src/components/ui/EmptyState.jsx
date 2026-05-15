export function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-surface/40 px-6 py-12 text-center">
      <p className="text-sm font-medium text-white/80">{title}</p>
      {description && (
        <p className="mt-2 text-sm text-muted">{description}</p>
      )}
    </div>
  );
}
