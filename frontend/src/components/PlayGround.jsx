import { useRef, useState } from "react";
import WrongAlert from "./WrongAlert";
import CorrectAlert from "./CorrectAlert";
import { MapPin } from "lucide-react";

const Status = {
  PLAYING: "playing",
  WON: "won",
};

export default function PlayGround({
  mapImageUrl,
  dbCharacters = [],
  clickedCharacters,
  setClickedCharacters,
  setGameStatus,
  gameStatus,
}) {
  const imageRef = useRef(null);
  const [selection, setSelection] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [correctMarkers, setCorrectMarkers] = useState([]);

  const handleCanvasClick = (event) => {
    if (!imageRef.current || gameStatus === Status.WON) return;

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageRef.current.naturalWidth / rect.width;
    const scaleY = imageRef.current.naturalHeight / rect.height;

    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    const xPercent = (clickX / imageRef.current.naturalWidth) * 100;
    const yPercent = (clickY / imageRef.current.naturalHeight) * 100;

    setSelection({
      xPercent,
      yPercent,
      screenX: event.clientX,
      screenY: event.clientY,
    });
  };

  const showAlert = (type) => {
    setAlertType(type);
    window.setTimeout(() => setAlertType(null), 2500);
  };

  const checkIfTargetFound = (characterName) => {
    if (!selection) return;

    const targetCharacter = dbCharacters.find(
      (char) => char.name.toLowerCase() === characterName.toLowerCase(),
    );

    if (!targetCharacter) return;

    const ACCEPTABLE_RADIUS = 3.5;
    const xDiff = Math.abs(selection.xPercent - targetCharacter.xPercent);
    const yDiff = Math.abs(selection.yPercent - targetCharacter.yPercent);
    const found = xDiff <= ACCEPTABLE_RADIUS && yDiff <= ACCEPTABLE_RADIUS;

    if (found) {
      showAlert("correct");
      setCorrectMarkers((prev) => [
        ...prev,
        {
          id: targetCharacter.id,
          name: targetCharacter.name,
          xPercent: targetCharacter.xPercent,
          yPercent: targetCharacter.yPercent,
        },
      ]);
      setClickedCharacters((prev) => {
        const updatedClickedCharacters = {
          ...prev,
          [characterName.toLowerCase()]: true,
        };
        const isGameWon = dbCharacters.every(
          (char) => updatedClickedCharacters[char.name.toLowerCase()],
        );
        if (isGameWon) {
          setGameStatus(Status.WON);
        }
        return updatedClickedCharacters;
      });
      setSelection(null);
    } else {
      showAlert("wrong");
    }
  };

  const activeDropdownChoices = dbCharacters.filter(
    (char) => !clickedCharacters[char.name.toLowerCase()],
  );

  return (
    <section
      className="playground"
      style={{
        position: "relative",
        width: "100%",
        padding: "120px",
        boxSizing: "border-box",
      }}
    >
      <div className="relative-image-container relative inline-block w-full">
        <img
          ref={imageRef}
          src={mapImageUrl}
          alt="playground"
          onClick={handleCanvasClick}
          style={{
            width: "100%",
            height: "auto",
            cursor: gameStatus === Status.WON ? "default" : "crosshair",
            display: "block",
          }}
        />

        {correctMarkers.map((marker) => (
          <MapPin
            key={marker.id}
            className="absolute flex items-center justify-center pointer-events-none"
            size="32"
            color="green"
            style={{
              left: `${marker.xPercent}%`,
              top: `${marker.yPercent}%`,
              zIndex: 10,
            }}
          />
        ))}
      </div>

      {selection && (
        <>
          <div
            className="selection-marker aura-glow"
            style={{
              position: "fixed",
              left: selection.screenX,
              top: selection.screenY,
              width: "50px",
              height: "50px",
              border: "3px solid black",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          />
          <div
            className="dropdown"
            style={{
              position: "fixed",
              left: selection.screenX + 35,
              top: selection.screenY,
              zIndex: 1001,
            }}
          >
            <div tabIndex={0} role="button" className="btn m-1">
              Make A Selection
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {activeDropdownChoices.map((char) => (
                <li key={char.id}>
                  <button onClick={() => checkIfTargetFound(char.name)}>
                    {char.name.charAt(0).toUpperCase() + char.name.slice(1)}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => setSelection(null)}>Cancel</button>
              </li>
            </ul>
          </div>
        </>
      )}

      {alertType === "correct" && (
        <div className="fixed top-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4">
          <CorrectAlert />
        </div>
      )}
      {alertType === "wrong" && (
        <div className="fixed top-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4">
          <WrongAlert />
        </div>
      )}
    </section>
  );
}
