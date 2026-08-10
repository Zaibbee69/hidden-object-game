const { Router } = require("express")
const { getGameImage, getAllGameImages } = require("../controllers/gameImagesController")
const gameImagesRouter = Router()


gameImagesRouter.get("/:id", getGameImage)
gameImagesRouter.get("/", getAllGameImages)


module.exports = gameImagesRouter