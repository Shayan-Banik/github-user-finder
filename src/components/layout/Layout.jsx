import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas text-foreground">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <Header />
        <main className="mt-10">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
