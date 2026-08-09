import PlayGround from "./PlayGround";
import Target from "./Target";
import Timer from "./Timer";
import { useState } from "react";
import useSWR from "swr";

const API_BASE = import.meta.env.VITE_API_URL;

export default function Game() {
  const { data, error, isLoading } = useSWR("/api/game-images/2", (url) => {
    const fullUrl = `${API_BASE}${url}`;
    return fetch(fullUrl).then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    });
  });

  const [clickedCharacters, setClickedCharacters] = useState({});
  const [isGameActive, setIsGameActive] = useState(true);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
        foundCharacters={foundCharacters}
        characterImages={characterImages}
      />
      <div className="divider"></div>
      <div>
        <PlayGround
          mapImageUrl={mapImageUrl}
          dbCharacters={characters}
          setClickedCharacters={setClickedCharacters}
          setIsGameActive={setIsGameActive}
        />
      </div>
      <Timer isGameActive={isGameActive} />
    </section>
  );
}
