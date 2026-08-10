import { useState, useEffect } from "react";
import { formatTime } from "../utils";

export default function Timer({ gameStatus, setScore }) {
  const [seconds, setSeconds] = useState(0);

  // Interval hook to count upwards
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus === "won") {
      setScore(seconds);
    }
  }, [gameStatus, seconds, setScore]);

  return (
    <div className="toast">
      <div className="alert alert-info">
        <span className="countdown font-mono text-3xl">
          {formatTime(seconds)}
        </span>
      </div>
    </div>
  );
}
