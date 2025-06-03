const { db } = require("./config/firebase");

const posters = [
    {
        id: "poster1",
        title: "Poster 1",
        description: "Ini adalah deskripsi poster 1",
        votes: 0,
    },
    {
        id: "poster2",
        title: "Poster 2",
        description: "Ini adalah deskripsi poster 2",
        votes: 0,
    },
    {
        id: "poster3",
        title: "Poster 3",
        description: "Ini adalah deskripsi poster 3",
        votes: 0,
    },
    {
        id: "poster4",
        title: "Poster 4",
        description: "Ini adalah deskripsi poster 4",
        votes: 0,
    },
    {
        id: "poster5",
        title: "Poster 5",
        description: "Ini adalah deskripsi poster 5",
        votes: 0,
    },
    {
        id: "poster6",
        title: "Poster 6",
        description: "Ini adalah deskripsi poster 6",
        votes: 0,
    }
];

async function addPosters() {
    for (const poster of posters) {
        await db.collection("posters").doc(poster.id).set(poster);
        console.log(`✔️ Poster ${poster.id} ditambahkan`);
    }
    console.log("✅ Semua poster berhasil ditambahkan!");
}

addPosters().catch(console.error);
