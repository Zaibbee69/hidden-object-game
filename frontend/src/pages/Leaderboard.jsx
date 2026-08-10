import useSWR from "swr";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ServerStatus from "../components/ServerStatus";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Leaderboard() {
  const {
    data: scores,
    error,
    isLoading,
  } = useSWR("/api/game/score", (url) =>
    fetch(`${API_BASE}${url}`).then((res) => {
      if (!res.ok) throw new Error("Could not load scores");
      return res.json();
    }),
  );

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-base-100">
      <Navbar />

      <main className="container mx-auto p-8 flex-grow max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            🏆 Global <span className="text-primary">Scoreboard</span>
          </h1>
          <p className="text-base-content/70">
            The fastest searchers in the grid layout world.
          </p>
        </div>

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
          <div className="overflow-x-auto border border-base-200 shadow-xl rounded-2xl bg-base-200/30 backdrop-blur-md">
            <table className="table table-zebra w-full text-center">
              <thead>
                <tr className="text-base-content/70 text-sm">
                  <th className="w-16">Rank</th>
                  <th>Player</th>
                  <th>Map Level</th>
                  <th>Completion Time</th>
                </tr>
              </thead>
              <tbody>
                {scores?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-base-content/50">
                      No records logged yet. Be the first to secure a spot!
                    </td>
                  </tr>
                ) : (
                  scores?.map((score, index) => (
                    <tr key={score.id} className="hover">
                      <td className="font-bold font-mono">
                        {index === 0 && "🥇"}
                        {index === 1 && "🥈"}
                        {index === 2 && "🥉"}
                        {index > 2 && `#${index + 1}`}
                      </td>
                      <td className="font-semibold text-primary">
                        {score.playerName}
                      </td>
                      <td className="text-sm">
                        {score.session?.image?.title || "Unknown Map"}
                      </td>
                      <td className="font-mono text-lg font-black text-secondary">
                        {formatTime(score.timeTaken)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
