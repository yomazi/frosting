const createError = require("http-errors");
const admin = require("firebase-admin");
const auth = admin.auth();

class AuthRepository {
  static async verify(token) {
    try {
      const decodedToken = await auth.verifyIdToken(token);

      return decodedToken;
    } catch (error) {
      throw new createError.Forbidden("Authorization token has expired.");
    }
  }
}

module.exports = AuthRepository;
