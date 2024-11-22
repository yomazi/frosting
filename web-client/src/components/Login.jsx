import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false);
  const auth = getAuth();

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();
      const response = await axios.post("/api/authenticate", {
        token,
      });
      console.log("Response: ", response);
      localStorage.setItem("frostingUserToken", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      setShouldShowErrorMessage(true);
    }
  };

  return (
    <section>
      <h2>Login</h2>
      <a href="/register">Register a new user instead</a>
      <article>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={login}>Login</button>
      </article>
      {shouldShowErrorMessage && (
        <div style={{ color: "red" }}>I don't recognize you!</div>
      )}
    </section>
  );
};

export default Login;
