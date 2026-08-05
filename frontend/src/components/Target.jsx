import duolingoPic from "../assets/duolingo.jfif";
import spidermanPic from "../assets/spiderman.jfif";
import narutoPic from "../assets/Naruto.jpg";

export default function Target({ foundCharacters = {} }) {
  const characters = [
    {
      name: "duolingo",
      image: duolingoPic,
      isFound: foundCharacters.duolingo,
      tagline: "Spanish Lessons Now!",
    },
    {
      name: "spiderman",
      image: spidermanPic,
      isFound: foundCharacters.spiderman,
      tagline: "Not So Amazing",
    },
    {
      name: "naruto",
      image: narutoPic,
      isFound: foundCharacters.naruto,
      tagline: "Dattebayo",
    },
  ];
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="stats shadow text-center">
        {characters.map((character) => (
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div
                className={`avatar ${foundCharacters[character.name] ? "opacity-40" : ""}`}
              >
                <div className="w-16 rounded-full">
                  <img src={character.image} alt={character.name} />
                </div>
              </div>
            </div>
            <div className="stat-value">
              {character.name.charAt(0).toUpperCase() + character.name.slice(1)}
            </div>
            <div className="stat-title">
              {character.isFound ? "Found" : "Not Found"}
            </div>
            <div className="stat-desc text-secondary">{character.tagline}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
