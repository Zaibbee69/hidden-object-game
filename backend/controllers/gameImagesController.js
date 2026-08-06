const prisma = require("../prisma/prismaClient")

async function getGameImage(req, res) {

    const imageId = parseInt(req.params.id)

    // Get Game Image
    const gameImage = await prisma.image.findUnique({ where: { id: imageId }, include: { characters: true } })

    res.json(gameImage)
}

module.exports = {
    getGameImage
}
