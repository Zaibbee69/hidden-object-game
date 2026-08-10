const prisma = require("../prisma/prismaClient");

async function startGame(req, res) {
    try {
        // 1. Destructure the property from the body first
        const { imageId } = req.body;

        // 2. Validate and cleanly parse into an integer
        const parsedImageId = parseInt(imageId, 10);
        if (!parsedImageId || isNaN(parsedImageId)) {
            return res.status(400).json({ message: "A valid Image ID is required to start the game." });
        }

        // 3. Create the game session (Prisma handles the UUID automatically)
        const gameSession = await prisma.gameSession.create({
            data: {
                imageId: parsedImageId
            }
        });

        return res.status(201).json({
            message: "Game started!",
            gameSessionId: gameSession.id
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to start game session." });
    }
}

async function endGame(req, res) {
    try {
        // Destructure properties from the incoming body payload
        const { gameSessionId, playerName, timeTaken } = req.body;

        if (!gameSessionId) {
            return res.status(400).json({ message: "Game session ID is required to end the game." });
        }

        // Update session and create the nested Score record according to your schema
        const endedGameSession = await prisma.gameSession.update({
            where: {
                id: gameSessionId
            },
            data: {
                completedAt: new Date(),
                completed: true,
                // Use Prisma's nested write syntax to create the related Score row
                score: {
                    create: {
                        playerName: playerName || "Anonymous",
                        timeTaken: parseInt(timeTaken, 10) || 0
                    }
                }
            },
            include: {
                score: true // Return the score data back to frontend in the response
            }
        });

        return res.status(200).json({ message: "Game ended!", endedGameSession });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to end game session." });
    }
}

async function getScore(req, res) {
    try {
        const scores = await prisma.score.findMany({
            orderBy: {
                timeTaken: 'asc', // Fastest times rank first
            },
            include: {
                session: {
                    include: {
                        image: true, // Includes map details like title
                    },
                },
            },
        });

        return res.status(200).json(scores);
    } catch (error) {
        console.error("Failed to fetch scoreboard:", error);
        return res.status(500).json({ error: "Failed to fetch leaderboard data" });
    }
}

module.exports = { startGame, endGame, getScore };
