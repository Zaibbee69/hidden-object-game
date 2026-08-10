import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

const API_BASE = import.meta.env.VITE_API_URL;

async function sendEndGameRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Failed to finalize score sheet entry.");
  }

  return response.json();
}

export default function Modal({ score, gameSessionId }) {
  const [playerName, setPlayerName] = useState("");

  const { trigger, isMutating } = useSWRMutation(
    `${API_BASE}/api/game/end`,
    sendEndGameRequest,
    {
      onSuccess: () => {
        const modal = document.getElementById("win_modal");
        if (modal) modal.close();
        window.location.reload();
      },
      onError: (err) => {
        console.error(err);
        alert("Could not post score sheet record.");
      },
    },
  );

  useEffect(() => {
    const modal = document.getElementById("win_modal");
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!playerName.trim() || isMutating) return;

    trigger({
      gameSessionId: gameSessionId,
      playerName: playerName.trim(),
      timeTaken: score,
    });
  };

  const formatFinalTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <dialog id="win_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-2xl text-success">Congratulations! 🎉</h3>
        <p className="py-2 text-base-content/80">
          Your run is validated by the server.
        </p>

        <div className="bg-base-200 rounded-lg p-3 my-4 flex justify-between items-center font-mono">
          <span className="font-bold">Final Clock Time:</span>
          <span className="text-xl text-primary font-black">
            {formatFinalTime(score)}
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="modal-action flex flex-col items-stretch gap-2"
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend text-sm">Save Your Rank</legend>
            <div className="join w-full">
              <input
                type="text"
                className="input join-item input-bordered w-full"
                placeholder="Enter player moniker..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                required
                disabled={isMutating}
              />
              <button
                type="submit"
                className={`btn btn-primary join-item ${isMutating ? "loading" : ""}`}
                disabled={!playerName.trim() || isMutating}
              >
                {isMutating ? "Submitting..." : "Save Run"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </dialog>
  );
}
