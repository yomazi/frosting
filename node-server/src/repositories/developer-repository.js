const createError = require("http-errors");
const admin = require("firebase-admin");
const AuthRepository = require("./auth-repository");
const FIREBASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

class DeveloperRepository {
  static async login(email, password, apiKey) {
    try {
      const firebaseAuthUrl = `${FIREBASE_URL}?key=${apiKey}`;
      const response = await fetch(firebaseAuthUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        throw new createError.Unauthorized(errorData.error.message || "Authentication failed.");
      }

      const data = await response.json();
      const idToken = data.idToken;
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      return {
        message: `User ${email} logged in successfully.`,
        uid: decodedToken.uid,
        idToken: data.idToken,
      };
    } catch (error) {
      throw new createError.Unauthorized(`Authentication failed: ${error.message}`);
    }
  }

  static async logout(idToken) {
    const decodedToken = await AuthRepository.verify(idToken);
    const uid = decodedToken.uid;

    await admin.auth().revokeRefreshTokens(uid);

    const email = decodedToken.email;
    const result = {
      message: `User ${email} logged out successfully.`,
    };

    return result;
  }
}

module.exports = DeveloperRepository;
