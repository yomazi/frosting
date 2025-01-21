const AuthRepository = require("../repositories/auth-repository");
const UsersRepository = require("../repositories/users-repository");
const createError = require("http-errors");

class AuthService {
  static async verify(idToken) {
    const decodedToken = await AuthRepository.verify(idToken);
    const uid = decodedToken.uid;
    const user = await UsersRepository.findByUid(uid);

    return { user };
  }

  static getToken(authorizationHeader) {
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new createError.Unauthorized("Unauthorized. Missing or invalid Authorization header.");
    }

    const idToken = authorizationHeader.split(" ")[1];

    return idToken;
  }

  static async decodeToken(authorizationHeader) {
    const idToken = AuthService.getToken(authorizationHeader);
    const decodedToken = await AuthRepository.verify(idToken);

    return decodedToken;
  }
}

module.exports = AuthService;
