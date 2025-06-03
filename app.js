const express = require("express");
const path = require("path");
const { db, admin } = require("./config/firebase");
const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/vote", (req, res) => {
    const posterId = req.query.posterId;
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/vote", async (req, res) => {
    try {
        const { voucherCode, posterId } = req.body;

        if (!voucherCode || !posterId) {
            return res.status(400).json({ error: "Voucher code & poster ID required" });
        }

        const voucherRef = db.collection("vouchers").doc(voucherCode);
        const voucherDoc = await voucherRef.get();

        if (!voucherDoc.exists || voucherDoc.data().isUsed) {
            return res.status(400).json({ error: "Invalid or already used voucher" });
        }

        await voucherRef.update({
            isUsed: true,
            usedForPosterId: posterId,
            usedAt: new Date().toISOString(),
        });

        const posterRef = db.collection("posters").doc(posterId);
        await posterRef.update({
            votes: admin.firestore.FieldValue.increment(1),
        });

        return res.json({ success: true, message: "Vote successfully recorded" });
    } catch (error) {
        console.error("Error in /vote:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }


});

app.get("/vote-result", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "vote-result.html"));
});

app.get("/posters", async (req, res) => {
    try {
        const snapshot = await db.collection("posters").orderBy("votes", "desc").get();
        const posters = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json({ posters });
    } catch (error) {
        console.error("Error fetching posters:", error);
        res.status(500).json({ error: "Failed to fetch posters" });
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
