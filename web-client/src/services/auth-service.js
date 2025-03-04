import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

class AuthService {
  static #unsubscribeAuthListener = null;
  static #shouldVerifyTokens = true;

  static get shouldVerifyTokens() {
    return this.#shouldVerifyTokens;
  }

  static set shouldVerifyTokens(value) {
    this.#shouldVerifyTokens = value;
  }

  static async verifyToken(idToken) {
    try {
      const response = await axios.post(
        `/api/v1/auth/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );

      return response;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  static listenToAuthChanges(dispatch, login, logout) {
    const auth = getAuth();

    if (this.#unsubscribeAuthListener) {
      console.log("unsubscribing");
      this.#unsubscribeAuthListener();
    }

    this.#unsubscribeAuthListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (this.#shouldVerifyTokens) {
          const idToken = await user.getIdToken(true);
          const response = await AuthService.verifyToken(idToken);
          const dbUser = response.data.user;

          dispatch(login({ ...dbUser }));
        }
      } else {
        dispatch(logout());
      }
    });
  }
}

export default AuthService;
