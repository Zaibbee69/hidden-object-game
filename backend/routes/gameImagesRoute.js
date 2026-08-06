const { Router } = require("express")
const { getGameImage } = require("../controllers/gameImagesController")
const gameImagesRouter = Router()


gameImagesRouter.get("/:id", getGameImage)


module.exports = gameImagesRouter