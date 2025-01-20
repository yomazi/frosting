const AuthRepository = require("../repositories/auth-repository");
const UsersRepository = require("../repositories/users-repository");

class AuthService {
  static async verify(token) {
    const uid = await AuthRepository.verify(token);
    const user = await UsersRepository.findByUid(uid);

    return { user };
  }
}

module.exports = AuthService;
