const ConfigService = require("../services/config-service");

class ConfigController {
  static async getEnvironmentVariables(req, res, next) {
    try {
      const environmentId = ConfigService.environmentId;
      const dbId = ConfigService.dbId;
      const firebaseConfig = ConfigService.firebaseConfig;

      const result = {
        environmentId,
        dbId,
        firebaseConfig,
      };

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ConfigController;
