import { useRef, useState } from "react";
import WrongAlert from "./WrongAlert";
import CorrectAlert from "./CorrectAlert";

export default function PlayGround({
  mapImageUrl,
  dbCharacters = [],
  setClickedCharacters,
}) {
  const imageRef = useRef(null);
  const [selection, setSelection] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const handleCanvasClick = (event) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageRef.current.naturalWidth / rect.width;
    const scaleY = imageRef.current.naturalHeight / rect.height;

    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    // Calculate percent on click
    const xPercent = (clickX / imageRef.current.naturalWidth) * 100;
    const yPercent = (clickY / imageRef.current.naturalHeight) * 100;

    console.log(
      `DB Values -> xPercent: ${xPercent.toFixed(2)}, yPercent: ${yPercent.toFixed(2)}`,
    );

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

    // Find the character profile matching the dropdown choice from database records
    const targetCharacter = dbCharacters.find(
      (char) => char.name.toLowerCase() === characterName.toLowerCase(),
    );

    if (!targetCharacter) return;

    // Define acceptable margin of error percentage (e.g., 3.5% padding around the exact target dot)
    const ACCEPTABLE_RADIUS = 3.5;

    const xDiff = Math.abs(selection.xPercent - targetCharacter.xPercent);
    const yDiff = Math.abs(selection.yPercent - targetCharacter.yPercent);

    // Verify if click falls inside the tolerance radius
    const found = xDiff <= ACCEPTABLE_RADIUS && yDiff <= ACCEPTABLE_RADIUS;

    if (found) {
      showAlert("correct");
      setClickedCharacters((prev) => ({
        ...prev,
        [characterName.toLowerCase()]: true,
      }));
      setSelection(null);
    } else {
      showAlert("wrong");
    }
  };

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
      <img
        ref={imageRef}
        src={mapImageUrl}
        alt="playground"
        onClick={handleCanvasClick}
        style={{
          width: "100%",
          height: "auto",
          cursor: "crosshair",
          display: "block",
        }}
      />

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
              {/* Loop through characters dynamically matching database entries */}
              {dbCharacters.map((char) => (
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
