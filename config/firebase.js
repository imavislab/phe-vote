const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        // Replace escaped newlines with actual newlines
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    } catch (error) {
        console.error('Error parsing FIREBASE_SERVICE_ACCOUNT:', error);
        serviceAccount = require('./serviceAccountKey.json');
    }
} else {
    serviceAccount = require('./serviceAccountKey.json');
}

const firebaseAdminConfig = {
    credential: cert(serviceAccount)
};

function getFirebaseAdminApp() {
    if (getApps().length === 0) {
        return initializeApp(firebaseAdminConfig);
    }
    return getApps()[0];
}

const admin = require('firebase-admin');
const db = getFirestore(getFirebaseAdminApp());

module.exports = { db, admin };
