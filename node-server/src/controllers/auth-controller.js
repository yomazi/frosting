const AuthService = require("../services/auth-service");

class AuthController {
  static async verify(req, res, next) {
    try {
      const { token } = req.body;
      const result = await AuthService.verify(token);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
