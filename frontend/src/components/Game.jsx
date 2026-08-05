import PlayGround from "./PlayGround";
import Target from "./Target";
import { useState } from "react";

export default function Game() {
  const [foundCharacters, setFoundCharacters] = useState({
    duolingo: false,
    spiderman: false,
    naruto: false,
  });

  return (
    <section className="game relative">
      <Target foundCharacters={foundCharacters} />

      <div className="divider"></div>
      <div>
        <PlayGround setFoundCharacters={setFoundCharacters} />
      </div>
    </section>
  );
}
