const ENVIRONMENT_IDS = {
  LOCAL: "local",
  STAGING: "staging",
  PRODUCTION: "production",
};

const DEFAULT_PORT = 8080;

const stagingDbKey = require("../../firebase/service-account-key-staging.json");
const productionDbKey = require("../../firebase/service-account-key-production.json");

const DB_KEYS = {
  STAGING: stagingDbKey,
  PRODUCTION: productionDbKey,
};

const DB_IDS = {
  STAGING: "staging",
  PRODUCTION: "production",
};

const FIREBASE_CONFIG = {
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

API_KEYS = {
  STAGING: FIREBASE_CONFIG.STAGING.apiKey,
  PRODUCTION: FIREBASE_CONFIG.PRODUCTION.apiKey,
};

module.exports = { ENVIRONMENT_IDS, DEFAULT_PORT, DB_KEYS, DB_IDS, FIREBASE_CONFIG, API_KEYS };
