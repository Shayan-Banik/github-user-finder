import { Layout } from "./components/layout/Layout";
import { SearchBar } from "./components/search/SearchBar";
import { UserProfile } from "./components/profile/UserProfile";
import { RepoList } from "./components/repos/RepoList";
import { EmptyState } from "./components/ui/EmptyState";
import { Spinner } from "./components/ui/Spinner";
import { useGitHubUser } from "./hooks/useGitHubUser";
import "./index.css";

export default function App() {
  const { user, repos, loading, error, fetchUser } = useGitHubUser();

  return (
    <Layout>
      <SearchBar onSearch={fetchUser} loading={loading} />

      {error && (
        <p
          className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
          role="alert"
        >
          {error}
        </p>
      )}

      {loading && (
        <div className="mt-8 flex justify-center">
          <Spinner className="size-8 border-2" />
        </div>
      )}

      {!loading && user && (
        <>
          <div className="mt-6">
            <UserProfile user={user} />
          </div>
          <RepoList repos={repos} />
        </>
      )}

      {!loading && !user && !error && (
        <div className="mt-8">
          <EmptyState
            title="Start typing to discover GitHub users"
            description="Pick a suggestion or press Search to load a profile and their five most recent repositories."
          />
        </div>
      )}
    </Layout>
  );
}
