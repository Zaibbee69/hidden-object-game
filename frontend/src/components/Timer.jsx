import { useState, useEffect } from "react";
import { formatTime } from "../utils";

export default function Timer({ gameStatus }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameStatus]);

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
