const { envId, dbId, firebaseConfig } = require("../config/firebase.js");

const getEnvironmentInfo = async (req, res) => {
  try {
    res.json({ environment: envId, db: dbId, firebaseConfig: firebaseConfig });
  } catch (error) {
    console.error("Error getting environment info:", error);
    res.status(500).json({
      error: `Failed to get environment info: ${error.message}`,
    });
  }
};

module.exports = { getEnvironmentInfo };
