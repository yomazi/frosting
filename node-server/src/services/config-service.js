const admin = require("firebase-admin");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");
const {
  ENVIRONMENT_IDS,
  DEFAULT_PORT,
  DB_KEYS,
  FIREBASE_CONFIG,
  DB_IDS,
  API_KEYS,
} = require("./config-service-constants");

const envFile = `.env.${process.env.NODE_ENV}`;

dotenv.config({ path: envFile });

const environmentId = process.env.NODE_ENV;
const useProductionDbLocally = process.env.USE_PRODUCTION_DB_LOCALLY;
const useProductionDb = !!(environmentId === ENVIRONMENT_IDS.PRODUCTION || useProductionDbLocally);

class ConfigService {
  static #environmentId = environmentId;
  static #useProductionDb = useProductionDb;
  static #dbId = useProductionDb ? DB_IDS.PRODUCTION : DB_IDS.STAGING;
  static #firebaseConfig = useProductionDb ? FIREBASE_CONFIG.PRODUCTION : FIREBASE_CONFIG.STAGING;
  static #apiKey = useProductionDb ? API_KEYS.PRODUCTION : API_KEYS.STAGING;

  static get environmentId() {
    return this.#environmentId;
  }

  static get useProductionDb() {
    return this.#useProductionDb;
  }

  static get dbId() {
    return this.#dbId;
  }

  static get firebaseConfig() {
    return this.#firebaseConfig;
  }

  static get apiKey() {
    return this.#apiKey;
  }

  static enableCors = (app) => {
    const cors = require("cors");

    app.use(
      cors({
        origin: "https://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      }),
    );

    console.log("** CORS is enabled at https://localhost:3000.");
  };

  static getHttpsOptions() {
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, "../../../https/server.key")),
      cert: fs.readFileSync(path.join(__dirname, "../../../https/server.cert")),
    };

    return httpsOptions;
  }

  static getHttpPort() {
    const port = process.env.PORT || DEFAULT_PORT;

    return port;
  }

  static getDbKey() {
    let dbKey = DB_KEYS.STAGING;

    if (ConfigService.useProductionDb) {
      console.log("** Using Frosting production db.");
      dbKey = DB_KEYS.PRODUCTION;
    } else {
      console.log("** Using Frosting staging db.");
      dbKey = DB_KEYS.STAGING;
    }

    return dbKey;
  }

  static initialize(app) {
    const allEnvironmentIds = Object.values(ENVIRONMENT_IDS);

    if (!allEnvironmentIds.includes(ConfigService.environmentId)) {
      const errorString = `invalid environment id: "${ConfigService.environmentId}". Must be one of the following: ${allEnvironmentIds.join(", ")}`;

      throw createError(500, errorString);
    }

    if (ConfigService.environmentId === ENVIRONMENT_IDS.LOCAL) {
      ConfigService.enableCors(app);
    }

    const dbKey = ConfigService.getDbKey();

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(dbKey),
      });
    }
  }
}

module.exports = ConfigService;
