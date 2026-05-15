export function Spinner({ className = "" }) {
  return (
    <span
      className={`inline-block size-4 animate-spin rounded-full border-2 border-white/20 border-t-accent ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
