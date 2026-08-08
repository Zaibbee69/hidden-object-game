import PlayGround from "./PlayGround";
import Target from "./Target";
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

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // 1. Extract the main map/background image URL from the API response
  const mapImageUrl = data?.imageUrl ? `${API_BASE}${data.imageUrl}` : "";

  // 2. Derive characters and append their full API image URL paths
  const characters = data?.characters || [];

  const foundCharacters = {};
  const characterImages = {}; // Keeps track of character names mapped to their image paths

  characters.forEach((char) => {
    const key = char.name.toLowerCase();
    foundCharacters[key] = !!clickedCharacters[key];

    // Construct the absolute path for each character's icon
    characterImages[key] = char.imageUrl ? `${API_BASE}${char.imageUrl}` : "";
  });

  return (
    <section className="game relative">
      {/* 3. Pass character images to Target to display their icons next to their names */}
      <Target
        foundCharacters={foundCharacters}
        characterImages={characterImages}
      />

      <div className="divider"></div>

      <div>
        {/* 4. Pass the main map background image to the PlayGround component */}
        <PlayGround
          mapImageUrl={mapImageUrl}
          setClickedCharacters={setClickedCharacters}
        />
      </div>
    </section>
  );
}
