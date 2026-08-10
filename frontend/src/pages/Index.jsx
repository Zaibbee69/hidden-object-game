import { Link } from "react-router";
import useSWR from "swr";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ServerStatus from "../components/ServerStatus";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Index() {
  // 1. Fetch available game map assets dynamically from your Express API
  const {
    data: maps,
    error,
    isLoading,
  } = useSWR("/api/game-images", (url) =>
    fetch(`${API_BASE}${url}`).then((res) => {
      if (!res.ok) throw new Error("Could not load maps");
      return res.json();
    }),
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-base-100">
      <Navbar />

      <header className="hero bg-base-200 py-16 px-4 text-center">
        <div className="hero-content max-w-2xl flex flex-col gap-4">
          <h1 className="text-5xl font-black tracking-tight">
            Welcome to <span className="text-primary">MapFinder!</span>
            🎯
          </h1>
          <p className="text-base-content/80 text-lg">
            Test your perception skills! Choose an image playground map layout
            from the catalog below, locate all the hidden target characters as
            fast as possible, and secure your place on our global scoreboard.
          </p>
          <div className="flex justify-center gap-3 mt-2">
            <Link to="/leaderboard" className="btn btn-outline btn-secondary">
              🏆 View Scoreboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Map Catalog Grid */}
      <main className="container mx-auto p-8 flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Select an Image Playground
        </h2>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loading />
          </div>
        )}

        {error && (
          <div className="flex justify-center py-12">
            <ServerStatus />
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* If maps is a single image object instead of an array, wrap it or loop safely */}
            {(Array.isArray(maps) ? maps : [maps]).map((map) => (
              <div
                key={map.id}
                className="card bg-base-100 image-full shadow border border-base-200 overflow-hidden group"
              >
                <figure className="h-60 overflow-hidden relative">
                  <img
                    src={`${API_BASE}${map.imageUrl}`}
                    alt={map.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>
                <div className="card-body justify-end">
                  <h3 className="card-title text-xl font-bold text-white">
                    {map.title || "Game Level"}
                  </h3>
                  <p className="text-xs text-white/80">
                    Targets to find: {map.characters?.length || 3}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    {/* Route players to the match canvas, appending the specific level image asset ID */}
                    <Link
                      to={`/game?id=${map.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Start Hunt 🚀
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
