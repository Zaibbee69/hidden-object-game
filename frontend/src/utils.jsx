const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Helper function to format raw seconds into MM:SS format
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  // Pads single digits with a leading zero (e.g., "05" instead of "5")
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

export { fetcher, formatTime };
