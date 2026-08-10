const prisma = require("../prisma/prismaClient")

async function getGameImage(req, res) {

    const imageId = parseInt(req.params.id)

    // Get Game Image
    const gameImage = await prisma.image.findUnique({ where: { id: imageId }, include: { characters: true } })

    return res.status(200).json(gameImage)
}

async function getAllGameImages(req, res) {

    const gameImages = await prisma.image.findMany({ include: { characters: true } })
    return res.status(200).json(gameImages)
}

module.exports = {
    getGameImage,
    getAllGameImages
}
