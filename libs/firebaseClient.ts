import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-twA4LXnzUE4MORA7_1jpWh1gncOUaWs",
  authDomain: "smartfarm-aa520.firebaseapp.com",
  databaseURL:
    "https://smartfarm-aa520-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartfarm-aa520",
  storageBucket: "smartfarm-aa520.firebasestorage.app",
  messagingSenderId: "364665339206",
  appId: "1:364665339206:web:00d16c110cfa4d9d363947",
  measurementId: "G-G2N01RLGQX",
};

export function getFirebaseDb() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  return getDatabase(app);
}