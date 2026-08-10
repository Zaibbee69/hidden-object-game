import { Link } from "react-router";
import useSWR from "swr";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ServerStatus from "../components/ServerStatus";
import FaultyTerminal from "../components/FaultyTerminal";
import { Ghost, CircleStar, Play } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Index() {
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

      {/* Hero Section Container with Active Terminal Background */}
      <header className="hero bg-base-200  text-center relative overflow-hidden">
        {/* WebGL Canvas Background Layer */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <FaultyTerminal
            style={{ width: "100%", height: "100%" }}
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={0.5}
            pause={false}
            scanlineIntensity={0.5}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0.1}
            tint="#E8E800"
            mouseReact
            mouseStrength={0.5}
            pageLoadAnimation
            brightness={0.6}
          />
        </div>

        {/* Foreground Content Stacked on Top (z-10 ensures readability) */}
        <div className="hero-content max-w-2xl flex flex-col gap-4 relative z-10  backdrop-blur-sm p-20 rounded-2xl shadow-xl">
          <h1 className="text-6xl font-black tracking-tight">
            <span className="inline-flex items-center gap-2 text-white">
              Lost <span className="text-warning">&</span> Found{" "}
              <Ghost size={32} className="text-warning" />
            </span>
          </h1>
          <p className="text-base-content/80 text-lg">
            Every click brings you closer to the truth.
          </p>
          <div className="flex justify-center gap-3 mt-2">
            <Link to="/leaderboard" className="btn btn-outline btn-warning">
              <CircleStar className="text-warning" strokeWidth={1.25} /> View
              LeaderBoard
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
                    <Link
                      to={`/game?id=${map.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Start Hunt <Play strokeWidth={1.25} />
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
