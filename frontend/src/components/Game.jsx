import PlayGround from "./PlayGround";
import Target from "./Target";
import Timer from "./Timer";
import ServerStatus from "./ServerStatus";
import Loading from "./Loading";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router"; // 1. Import hook
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const API_BASE = import.meta.env.VITE_API_URL;
const Status = { PLAYING: "playing", WON: "won" };

async function triggerStartSession(url, { arg }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!res.ok) throw new Error("Failed to start session");
  return res.json();
}

export default function Game() {
  const [searchParams] = useSearchParams(); // 2. Initialize search params
  const mapId = searchParams.get("id"); // 3. Extract the 'id' parameter

  const [clickedCharacters, setClickedCharacters] = useState({});
  const [gameStatus, setGameStatus] = useState(Status.PLAYING);
  const [score, setScore] = useState(0);
  const [gameSessionId, setGameSessionId] = useState(null);

  // 4. Update the SWR key to use mapId dynamically. If mapId doesn't exist, pass null to halt fetching.
  const { data, error, isLoading } = useSWR(
    mapId ? `/api/game-images/${mapId}` : null,
    (url) => {
      return fetch(`${API_BASE}${url}`).then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      });
    },
  );

  const { trigger: initSession } = useSWRMutation(
    `${API_BASE}/api/game/start`,
    triggerStartSession,
    {
      onSuccess: (data) => setGameSessionId(data.gameSessionId),
    },
  );

  useEffect(() => {
    if (data?.id) {
      initSession({ imageId: data.id });
    }
  }, [data?.id, initSession]);

  // Handle a state where no valid ID is passed in the URL at all
  if (!mapId) return <div className="text-center p-8">No Map Selected</div>;
  if (error) return <ServerStatus />;
  if (isLoading || !gameSessionId) return <Loading />;

  const mapImageUrl = data?.imageUrl ? `${API_BASE}${data.imageUrl}` : "";
  const characters = data?.characters || [];
  const foundCharacters = {};
  const characterImages = {};

  characters.forEach((char) => {
    const key = char.name.toLowerCase();
    foundCharacters[key] = !!clickedCharacters[key];
    characterImages[key] = char.imageUrl ? `${API_BASE}${char.imageUrl}` : "";
  });

  return (
    <section className="game relative">
      <Target
        dbCharacters={characters}
        foundCharacters={foundCharacters}
        characterImages={characterImages}
      />
      <div className="divider"></div>
      <div>
        <PlayGround
          mapImageUrl={mapImageUrl}
          dbCharacters={characters}
          clickedCharacters={clickedCharacters}
          setClickedCharacters={setClickedCharacters}
          setGameStatus={setGameStatus}
          gameStatus={gameStatus}
          setScore={setScore}
        />
      </div>
      <Timer gameStatus={gameStatus} setScore={setScore} />
      {gameStatus === Status.WON && (
        <Modal score={score} gameSessionId={gameSessionId} />
      )}
    </section>
  );
}
