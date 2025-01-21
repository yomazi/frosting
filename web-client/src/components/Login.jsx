import axios from "axios";
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../redux/slices/auth-slice";
import styles from "../styles/auth.module.scss";
import Spinner from "./Spinner";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const setAuthPersistence = async () => {
      try {
        setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Persistence setting failed:", error);
      }
    };

    setAuthPersistence();
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      dispatch(login({ user: userCredential.user }));
    } catch (error) {
      console.error("Login failed:", error);

      const errorMessages = {
        "auth/invalid-email": "Invalid email format.",
        "auth/user-not-found": "No account found with this email.",
        "auth/missing-password": "Missing password.",
        "auth/wrong-password": "Incorrect password.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      };

      setErrorMessage(errorMessages[error.code]);
      setShouldShowErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeEmail = (e) => {
    setShouldShowErrorMessage(false);
    setErrorMessage("");
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setShouldShowErrorMessage(false);
    setErrorMessage("");
    setPassword(e.target.value);
  };

  return (
    <>
      <section id="auth" className="flex flex-col items-center mt-8 w-full">
        <h1 className="mb-8">Sign In!</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <article className="flex flex-col items-center w-full">
            <input
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="Email"
              className="p-3 rounded-none focus:outline-none mb-4 w-full xs:max-w-lg sm:rounded-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
            />
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="Password"
              className="p-3 rounded-none focus:outline-none mb-4 w-full xs:max-w-lg sm:rounded-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
            />
            <section className="relative flex flex-col justify-center items-center xs:flex-row xs:px-3 mb-4 w-full xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
              <button type="submit" className="w-48 mb-2" disabled={isLoading}>
                Login
              </button>
              <div className="flex relative right-auto mt-6 h-12 px-4 hover:underline sm:absolute sm:mt-0 sm:right-0">
                <Link
                  to="/register"
                  className="flex h-full items-center text-purple-500 hover:text-purple-700 "
                >
                  Create an Account
                </Link>
              </div>
            </section>
          </article>
        </form>
        <article
          key={errorMessage}
          className={`${styles.message} ${styles.authErrorMessage} flex items-center h-16`}
        >
          {shouldShowErrorMessage && errorMessage}
        </article>
      </section>
      <Spinner openOn={isLoading} />
    </>
  );
};

export default Login;
