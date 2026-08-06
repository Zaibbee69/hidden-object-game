require('dotenv').config();
const path = require("node:path")
const express = require('express');

// Middleware
const globalErrorHandler = require("./middlewares/globalErrorHandler");

// Routes
const gameImagesRouter = require("./routes/gameImagesRoute");


// App Setup
const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// --- GLOBAL ERROR HANDLER ---
app.use(globalErrorHandler);

// Routes
app.use("/api/game-images", gameImagesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});