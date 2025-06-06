const { db } = require("./config/firebase");

function generateCode(totalLength = 6, prefix = "") {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const randomLength = totalLength - prefix.length;
    let code = "";
    for (let i = 0; i < randomLength; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return prefix + code;
}

async function generateVouchers(normalCount = 350, specialCount = 20) {
    const codes = new Set();

    // Generate kode spesial untuk direksi (dengan prefix, panjang tetap 6)
    const specialCodes = new Set();
    while (specialCodes.size < specialCount) {
        const code = generateCode(6, "VIP-");
        if (!codes.has(code)) {
            specialCodes.add(code);
            codes.add(code);
        }
    }

    // Generate kode biasa (tanpa prefix)
    while (codes.size < normalCount + specialCount) {
        const code = generateCode(6);
        codes.add(code);
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
            batch = db.batch();
        }
    }

    if (count % batchLimit !== 0) {
        await batch.commit();
        console.log("Committed remaining vouchers.");
    }

    console.log("✅ Finished generating vouchers.");
}

generateVouchers().catch(console.error);