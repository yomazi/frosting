const DeveloperService = require("../services/developer-service");
const AuthService = require("../services/auth-service");

class DeveloperController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await DeveloperService.login(email, password);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      const idToken = AuthService.getToken(req.headers.authorization);
      const result = await DeveloperService.logout(idToken);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DeveloperController;
