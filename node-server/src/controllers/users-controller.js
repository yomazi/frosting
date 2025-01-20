const UsersService = require("../services/users-service");

class UsersController {
  static async register(req, res, next) {
    try {
      const { firstName, lastName, email, uid } = req.body;
      const result = await UsersService.createUser(firstName, lastName, email, uid);

      return res.status(201).json({ message: "User created successfully.", uid: result.uid });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsersController;
