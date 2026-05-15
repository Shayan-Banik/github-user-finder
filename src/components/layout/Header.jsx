import { FiGithub } from "react-icons/fi";

export function Header() {
  return (
    <header className="text-center">
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent/15 ring-1 ring-accent/30">
        <FiGithub className="size-6 text-accent" aria-hidden />
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        GitHub Finder
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">
        Search any GitHub user — suggestions appear as you type, with profile
        details and latest repositories.
      </p>
    </header>
  );
}
