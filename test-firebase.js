const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function testConnection() {
    try {
        // Coba baca sebuah dokumen dummy yang mungkin tidak ada
        const doc = await db.collection('test').doc('connection').get();
        if (doc.exists) {
            console.log('Dokumen ditemukan:', doc.data());
        } else {
            console.log('Dokumen tidak ditemukan, tapi koneksi berhasil!');
        }
    } catch (error) {
        console.error('Gagal koneksi ke Firestore:', error);
    }
}

async function testWrite() {
    try {
        await db.collection('test').doc('connection').set({ status: 'connected', timestamp: new Date() });
        console.log('Berhasil menulis data ke Firestore!');
    } catch (error) {
        console.error('Gagal menulis data:', error);
    }
}

testWrite();


testConnection();
