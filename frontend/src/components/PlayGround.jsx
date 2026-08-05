import { useRef, useState } from "react";
import imgSrc from "../assets/MEME_SUPREME.jpg";
import WrongAlert from "./WrongAlert";
import CorrectAlert from "./CorrectAlert";

export default function PlayGround({ setFoundCharacters }) {
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

    setSelection({
      imageX: clickX,
      imageY: clickY,
      screenX: event.clientX,
      screenY: event.clientY,
    });
  };

  const showAlert = (type) => {
    setAlertType(type);
    window.setTimeout(() => setAlertType(null), 2500);
  };

  const checkIfTargetFound = (character) => {
    if (!selection) return;

    const { imageX, imageY } = selection;

    const targets = {
      duolingo: { minX: 400, maxX: 700, minY: 2200, maxY: 3050 },
      spiderman: { minX: 100, maxX: 400, minY: 1500, maxY: 2350 },
      naruto: { minX: 700, maxX: 1000, minY: 1500, maxY: 2350 },
    };

    const target = targets[character];
    if (!target) return;

    const found =
      imageX >= target.minX &&
      imageX <= target.maxX &&
      imageY >= target.minY &&
      imageY <= target.maxY;

    if (found) {
      showAlert("correct");
      setFoundCharacters((prev) => ({ ...prev, [character]: true }));
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
                <button onClick={() => checkIfTargetFound("duolingo")}>
                  Duolingo
                </button>
              </li>
              <li>
                <button onClick={() => checkIfTargetFound("spiderman")}>
                  Spiderman
                </button>
              </li>
              <li>
                <button onClick={() => checkIfTargetFound("naruto")}>
                  Naruto
                </button>
              </li>
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
