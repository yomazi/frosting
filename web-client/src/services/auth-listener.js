import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const listenToAuthChanges = (dispatch, login, logout) => {
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const response = await axios.post("/api/authenticate", {
        token,
      });
      const dbUser = response.data.user;

      dispatch(login({ ...dbUser }));
    } else {
      dispatch(logout());
    }
  });
};
