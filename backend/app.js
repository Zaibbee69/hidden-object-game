require('dotenv').config();
const path = require("node:path");
const express = require('express');
const cors = require('cors'); // 1. Import CORS

// Middleware
const globalErrorHandler = require("./middlewares/globalErrorHandler");

// Routes
const gameImagesRouter = require("./routes/gameImagesRoute");
const gameRouter = require("./routes/gameRoute");

// App Setup
const app = express();
const PORT = process.env.PORT;

// 2. Enable CORS for your frontend origin
app.use(cors({
    origin: [
        'http://localhost:5173',
        "https://hidden-object-game-six.vercel.app",
        "https://hidden-object-game-n40qfhfkx-zaibbee69s-projects.vercel.app"
    ]
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.use("/api/game-images", gameImagesRouter);
app.use("/api/game", gameRouter);

// --- GLOBAL ERROR HANDLER ---
app.use(globalErrorHandler);

module.exports = app; 