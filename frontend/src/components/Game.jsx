import PlayGround from "./PlayGround";
import Target from "./Target";
import { useState } from "react";

export default function Game() {
  const [foundCharacters, setFoundCharacters] = useState({
    duolingo: false,
    spiderman: false,
    naruto: false,
  });

  console.log("foundCharacters in Game:", foundCharacters);

  return (
    <section className="game relative">
      <Target foundCharacters={foundCharacters} />

      <div className="divider"></div>
      <div className="pt-40">
        <PlayGround setFoundCharacters={setFoundCharacters} />
      </div>
    </section>
  );
}
