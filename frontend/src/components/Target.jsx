export default function Target({
  dbCharacters = [],
  foundCharacters = {},
  characterImages = {},
}) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
      <div className="stats shadow text-center w-full grid grid-flow-col overflow-x-auto">
        {dbCharacters.map((char) => {
          const lowerName = char.name.toLowerCase();
          const isFound = !!foundCharacters[lowerName];
          const imageSrc = characterImages[lowerName];

          return (
            <div key={char.id} className="stat min-w-[150px]">
              <div className="stat-figure text-secondary">
                <div className={`avatar ${isFound ? "opacity-40" : ""}`}>
                  <div className="w-16 rounded-full">
                    {imageSrc ? (
                      <img src={imageSrc} alt={char.name} />
                    ) : (
                      <div className="bg-neutral text-neutral-content w-16 h-16 rounded-full flex items-center justify-center">
                        <span>?</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="stat-value text-xl">
                {char.name.charAt(0).toUpperCase() + char.name.slice(1)}
              </div>

              <div className="stat-title">
                {isFound ? "Found" : "Not Found"}
              </div>

              {/* Dynamic taglines read directly from your Prisma records */}
              <div className="stat-desc text-secondary truncate max-w-[140px]">
                {char.tagline || "Find me on the map!"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
