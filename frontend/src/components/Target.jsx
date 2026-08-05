import duolingoPic from "../assets/duolingo.jfif";
import spidermanPic from "../assets/spiderman.jfif";
import narutoPic from "../assets/Naruto.jpg";

export default function Target({ foundCharacters }) {
  console.log("foundCharacters in Target:", foundCharacters);
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="stats shadow text-center">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={duolingoPic} alt="Duolingo" />
              </div>
            </div>
          </div>
          <div className="stat-value">Duolingo</div>
          <div className="stat-title">
            {foundCharacters.duolingo ? "Found" : "Not Found"}
          </div>
          <div className="stat-desc text-secondary">Spanish Lessons Now!</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={spidermanPic} alt="Spiderman" />
              </div>
            </div>
          </div>
          <div className="stat-value">Spiderman</div>
          <div className="stat-title">
            {foundCharacters.spiderman ? "Found" : "Not Found"}
          </div>
          <div className="stat-desc text-secondary">Not So Amazing</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={narutoPic} alt="Naruto" />
              </div>
            </div>
          </div>
          <div className="stat-value">Naruto</div>
          <div className="stat-title">
            {foundCharacters.naruto ? "Found" : "Not Found"}
          </div>
          <div className="stat-desc text-secondary">Dattebayo</div>
        </div>
      </div>
    </div>
  );
}
