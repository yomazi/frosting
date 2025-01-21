const createError = require("http-errors");
const ConfigService = require("./config-service");
const DeveloperRepository = require("../repositories/developer-repository");

class DeveloperService {
  static async login(email, password) {
    const apiKey = ConfigService.apiKey;
    const result = await DeveloperRepository.login(email, password, apiKey);

    return result;
  }

  static async logout(idToken) {
    const isTokenValid = idToken && idToken !== "null";

    if (!isTokenValid) {
      throw new createError.Unauthorized("No token specified. Are you already logged out?");
    }

    const result = await DeveloperRepository.logout(idToken);

    return result;
  }
}

module.exports = DeveloperService;
