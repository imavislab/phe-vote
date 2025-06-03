const { db } = require("./config/firebase");  // <- perbaikan di sini

function generateCode(length = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

async function generateVouchers(total = 300) {
    const codes = new Set();

    while (codes.size < total) {
        codes.add(generateCode());
    }

    const batchLimit = 500;
    const vouchersRef = db.collection("vouchers");

    let batch = db.batch();
    let count = 0;

    for (const code of codes) {
        const docRef = vouchersRef.doc(code);
        batch.set(docRef, {
            code,
            isUsed: false,
            usedForPosterId: null,
            usedAt: null,
        });

        count++;

        if (count % batchLimit === 0) {
            await batch.commit();
            console.log(`Committed ${count} vouchers...`);
            batch = db.batch(); // mulai batch baru
        }
    }

    if (count % batchLimit !== 0) {
        await batch.commit();
        console.log("Committed remaining vouchers.");
    }

    console.log("✅ Finished generating vouchers.");
}

generateVouchers().catch(console.error);
