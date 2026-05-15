export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 text-center text-xs text-muted">
      GitHub Finder © {year} — UI demo using the public GitHub API
    </footer>
  );
}
