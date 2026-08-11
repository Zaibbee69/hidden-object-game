const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
    // Clear existing seed data
    await prisma.character.deleteMany();
    await prisma.image.deleteMany();

    // =========================
    // LEVEL 1 - Meme Supreme
    // =========================

    const memeSupreme = await prisma.image.create({
        data: {
            title: "Meme Supreme",
            imageUrl: "/MEME_SUPREME.jpg",
        },
    });

    await prisma.character.createMany({
        data: [
            {
                name: "Duolingo",
                tagline: "Spanish Lessons Now!",
                xPercent: 29.86,
                yPercent: 8.98,
                imageUrl: "/duolingo.jfif",
                imageId: memeSupreme.id,
            },
            {
                name: "Naruto",
                tagline: "Dattebayo",
                xPercent: 2.73,
                yPercent: 70.1,
                imageUrl: "/Naruto.jpg",
                imageId: memeSupreme.id,
            },
            {
                name: "SpiderMan",
                tagline: "Not So Amazing",
                xPercent: 48.8,
                yPercent: 82.01,
                imageUrl: "/SpiderMan.jfif",
                imageId: memeSupreme.id,
            },
        ],
    });

    // =========================
    // LEVEL 2 - Rainbow Mix
    // =========================

    const rainbowMix = await prisma.image.create({
        data: {
            title: "Rainbow Mix",
            imageUrl: "/RAINBOW_MIX.jpg",
        },
    });

    await prisma.character.createMany({
        data: [
            {
                name: "Jake",
                tagline: "Bad biscuits make the baker broke, bro.",
                xPercent: 13.27,
                yPercent: 39.33,
                imageUrl: "/Jake.jfif",
                imageId: rainbowMix.id,
            },
            {
                name: "Batman",
                tagline: "I am Vengeance",
                xPercent: 40.79,
                yPercent: 31.33,
                imageUrl: "/Batman.jfif",
                imageId: rainbowMix.id,
            },
            {
                name: "Panther",
                tagline: "Think nothing of it, chappie!",
                xPercent: 73.19,
                yPercent: 53.19,
                imageUrl: "/Panther.jfif",
                imageId: rainbowMix.id,
            },
        ],
    });

    // =========================
    // LEVEL 3 - Terrified Waldo
    // =========================

    const terrifiedWaldo = await prisma.image.create({
        data: {
            title: "Terrified Waldo",
            imageUrl: "/TERRIFIED_WALDO.webp",
        },
    });

    await prisma.character.createMany({
        data: [
            {
                name: "Alien",
                tagline: "Smooth Criminal",
                xPercent: 30.84,
                yPercent: 81.46,
                imageUrl: "/Alien.jpg",
                imageId: terrifiedWaldo.id,
            },
            {
                name: "Frankenstein",
                tagline: "Beware, For I Am Fearless",
                xPercent: 6.83,
                yPercent: 16.17,
                imageUrl: "/Frankernstein.jpg",
                imageId: terrifiedWaldo.id,
            },
            {
                name: "Clown",
                tagline: "Scary Or Die",
                xPercent: 92.52,
                yPercent: 7.93,
                imageUrl: "/Clown.jpg",
                imageId: terrifiedWaldo.id,
            },
        ],
    });

    console.log("✅ Seed completed");
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });