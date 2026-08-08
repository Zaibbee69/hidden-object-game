export default function Target({ foundCharacters = {}, characterImages = {} }) {
  const characters = [
    {
      name: "duolingo",
      isFound: foundCharacters.duolingo,
      tagline: "Spanish Lessons Now!",
    },
    {
      name: "spiderman",
      isFound: foundCharacters.spiderman,
      tagline: "Not So Amazing",
    },
    {
      name: "naruto",
      isFound: foundCharacters.naruto,
      tagline: "Dattebayo",
    },
  ];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="stats shadow text-center">
        {characters.map((character) => {
          // Get the dynamic API image path from the parent object
          const imageSrc = characterImages[character.name];

          return (
            <div key={character.name} className="stat">
              <div className="stat-figure text-secondary">
                <div
                  className={`avatar ${character.isFound ? "opacity-40" : ""}`}
                >
                  <div className="w-16 rounded-full">
                    {imageSrc ? (
                      <img src={imageSrc} alt={character.name} />
                    ) : (
                      <div className="bg-neutral text-neutral-content w-16 h-16 rounded-full flex items-center justify-center">
                        <span>?</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="stat-value text-xl">
                {character.name.charAt(0).toUpperCase() +
                  character.name.slice(1)}
              </div>
              <div className="stat-title">
                {character.isFound ? "Found" : "Not Found"}
              </div>
              <div className="stat-desc text-secondary">
                {character.tagline}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
