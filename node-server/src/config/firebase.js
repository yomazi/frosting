const os = require("os");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const stagingKey = require("../../../firebase/service-account-key-staging.json");

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

console.log(`*** ${envId} environment, using ${dbId} db ***`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`,
});

const db = admin.firestore();

module.exports = { admin, db, envId, dbId };
