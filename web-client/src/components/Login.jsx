import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import styles from "../styles/auth.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false);
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed:", error);
      setShouldShowErrorMessage(true);
    }
  };

  const onChangeEmail = (e) => {
    setShouldShowErrorMessage(false);
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setShouldShowErrorMessage(false);
    setPassword(e.target.value);
  };

  return (
    <section id="auth" className="flex flex-col items-center mt-8">
      <h1 className="mb-8">Login</h1>
      <article className="flex flex-col">
        <input
          type="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="Email"
          className="p-2 rounded-md focus:outline-none mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
          className="p-2 rounded-md focus:outline-none mb-4"
        />
        <button onClick={handleLogin}>Login</button>
      </article>
      <article className={`${styles.authErrorMessage} flex items-center h-16`}>
        {shouldShowErrorMessage ? "I don't recognize you!" : ""}
      </article>
      <div>
        <a href="/register">Register a new user instead</a>
      </div>
    </section>
  );
};

export default Login;
