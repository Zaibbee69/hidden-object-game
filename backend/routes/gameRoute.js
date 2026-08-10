const { Router } = require("express");
const { startGame, endGame, getScore } = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.post("/start", startGame);
gameRouter.post("/end", endGame);
gameRouter.get("/score", getScore);

module.exports = gameRouter;
