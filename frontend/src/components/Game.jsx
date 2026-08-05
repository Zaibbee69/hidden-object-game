import PlayGround from "./PlayGround";
import Target from "./Target";

export default function Game() {
  return (
    <section className="game relative">
      <Target />

      <div className="divider"></div>
      <div className="pt-40">
        <PlayGround />
      </div>
    </section>
  );
}
