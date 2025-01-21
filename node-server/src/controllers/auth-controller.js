const AuthService = require("../services/auth-service");

class AuthController {
  static async verify(req, res, next) {
    try {
      const idToken = AuthService.getToken(req.headers.authorization);
      const result = await AuthService.verify(idToken);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
