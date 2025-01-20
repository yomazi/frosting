import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

class AuthService {
  static #shouldVerifyTokens = true;

  static get shouldVerifyTokens() {
    return this.#shouldVerifyTokens;
  }

  static set shouldVerifyTokens(value) {
    this.#shouldVerifyTokens = value;
  }

  static listenToAuthChanges(dispatch, login, logout) {
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (this.#shouldVerifyTokens) {
          const token = await user.getIdToken();
          const response = await axios.post(`/api/v1/auth/verify`, {
            token,
          });
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
