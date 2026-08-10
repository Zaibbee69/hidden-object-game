import PlayGround from "./PlayGround";
import Target from "./Target";
import Timer from "./Timer";
import ServerStatus from "./ServerStatus";
import Loading from "./Loading";
import Modal from "./Modal";
import { useState } from "react";
import useSWR from "swr";

const API_BASE = import.meta.env.VITE_API_URL;

const Status = {
  PLAYING: "playing",
  WON: "won",
};

export default function Game() {
  const { data, error, isLoading } = useSWR("/api/game-images/2", (url) => {
    const fullUrl = `${API_BASE}${url}`;
    return fetch(fullUrl).then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    });
  });

  const [clickedCharacters, setClickedCharacters] = useState({});
  const [gameStatus, setGameStatus] = useState(Status.PLAYING);

  if (error) return <ServerStatus />;
  if (isLoading) return <Loading />;

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
        />
      </div>

      <Timer gameStatus={gameStatus} />

      {gameStatus === Status.WON && <Modal />}
    </section>
  );
}
