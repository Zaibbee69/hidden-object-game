import { useRef, useState } from "react";
import imgSrc from "../assets/MEME_SUPREME.jpg";

export default function PlayGround() {
  const imageRef = useRef(null);

  const [selection, setSelection] = useState(null);

  const handleCanvasClick = (event) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    const scaleX = imageRef.current.naturalWidth / rect.width;
    const scaleY = imageRef.current.naturalHeight / rect.height;

    const clickX = (event.clientX - rect.left) * scaleX;
    const clickY = (event.clientY - rect.top) * scaleY;

    setSelection({
      imageX: clickX,
      imageY: clickY,
      screenX: event.clientX,
      screenY: event.clientY,
    });
  };

  const checkIfTargetFound = (character) => {
    if (!selection) return;

    const { imageX, imageY } = selection;

    if (character === "waldo") {
      const target = {
        minX: 400,
        maxX: 700,
        minY: 2200,
        maxY: 3050,
      };

      const found =
        imageX >= target.minX &&
        imageX <= target.maxX &&
        imageY >= target.minY &&
        imageY <= target.maxY;

      if (found) {
        alert("You found Waldo!");
        setSelection(null);
      } else {
        alert("That's not Waldo.");
      }
    }

    if (character === "wizard") {
      alert("Wizard checking not implemented yet.");
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
        src={imgSrc}
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
              <li>
                <button onClick={() => checkIfTargetFound("waldo")}>
                  Waldo
                </button>
              </li>
              <li>
                <button onClick={() => checkIfTargetFound("wizard")}>
                  Wizard
                </button>
              </li>
              <li>
                <button onClick={() => setSelection(null)}>Cancel</button>
              </li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
