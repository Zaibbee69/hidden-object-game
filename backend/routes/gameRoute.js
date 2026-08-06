const { Router } = require("express");
const { startGame, endGame } = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.post("/start", startGame);
gameRouter.post("/end", endGame);

module.exports = gameRouter;
