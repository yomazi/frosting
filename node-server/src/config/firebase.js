const os = require("os");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const stagingKey = require("../../../firebase/service-account-key-staging.json");
const clientConfig = {
  STAGING: {
    apiKey: "AIzaSyBTpmkAHrE8hqtLTZoImCHdTK-yqODIFwY",
    authDomain: "frosting-dev-a5b37.firebaseapp.com",
    projectId: "frosting-dev-a5b37",
    storageBucket: "frosting-dev-a5b37.appspot.com",
    messagingSenderId: "1017468681757",
    appId: "1:1017468681757:web:54bc6107a6ecf82f8810f4",
    measurementId: "G-ZZM2C4Y582",
  },
  PRODUCTION: {
    apiKey: "AIzaSyBTpmkAHrE8hqtLTZoImCHdTK-yqODIFwY",
    authDomain: "frosting-dev-a5b37.firebaseapp.com",
    projectId: "frosting-dev-a5b37",
    storageBucket: "frosting-dev-a5b37.appspot.com",
    messagingSenderId: "1017468681757",
    appId: "1:1017468681757:web:54bc6107a6ecf82f8810f4",
    measurementId: "G-ZZM2C4Y582",
  },
};

const isLocalEnvironment = () => {
  const hostname = os.hostname();
  const interfaces = os.networkInterfaces();

  // Check for localhost-based hostnames or IP addresses
  const localIPs = Object.values(interfaces)
    .flat()
    .map((iface) => iface?.address)
    .filter((ip) => ip.startsWith("127.") || ip === "::1"); // Loopback IPs

  return hostname.includes("localhost") || localIPs.length > 0;
};

const getBuildFlags = () => {
  const hostname = os.hostname();
  const isStaging = hostname.startsWith("staging");
  const flags = {
    shouldUseProductionDb: !isStaging,
  };

  return flags;
};

const getLocalFlags = () => {
  const envFile = ".env.local";

  dotenv.config({ path: envFile });

  const flags = {
    shouldUseProductionDb: process.env.NODE_ENV_LOCAL_USE_PRODUCTION_DB,
  };

  return flags;
};

const isLocal = isLocalEnvironment();
const envId = isLocal ? "local" : "build";
const flags = isLocal ? getLocalFlags() : getBuildFlags();
const dbId = flags.shouldUseProductionDb ? "production" : "staging";
const serviceAccountKey = flags.shouldUseProductionDb ? stagingKey : stagingKey;
const projectId = flags.shouldUseProductionDb
  ? "frosting-dev-a5b37"
  : "frosting-dev-a5b37";
const firebaseConfig = flags.shouldUseProductionDb
  ? clientConfig.STAGING
  : clientConfig.STAGING;

console.log(`*** ${envId} environment using ${dbId} db ***`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`,
});

const auth = admin.auth();
const db = admin.firestore();

module.exports = { auth, db, envId, dbId, firebaseConfig };
