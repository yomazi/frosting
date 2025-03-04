import axios from "axios";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../redux/slices/auth-slice.js";
import AuthService from "../services/auth-service";
import styles from "../styles/auth.module.scss";
import Spinner from "./Spinner";

const Register = () => {
  const dispatch = useDispatch();
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      AuthService.shouldVerifyTokens = false;

      const { firstName, lastName, email, password } = formData;
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await axios.post(`/api/v1/users`, {
        firstName,
        lastName,
        email,
        uid: userCredential.user.uid,
      });

      const idToken = await userCredential.user.getIdToken(true); // Force token refresh
      const response = await AuthService.verifyToken(idToken);

      dispatch(login(response.data));
    } catch (error) {
      console.error("Create user failed:", error.message);

      const errorMessages = {
        "auth/invalid-email": "Invalid email format.",
        "auth/missing-password": "Missing password.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      };

      setErrorMessage(errorMessages[error.code]);
      setShouldShowErrorMessage(true);
    } finally {
      AuthService.shouldVerifyTokens = true;
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setShouldShowErrorMessage(false);
  };

  return (
    <>
      <section id="auth" className="flex flex-col items-center mt-8 w-full">
        <h1 className="mb-8">Create an Account!</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <article className="flex flex-col items-center w-full">
            {[
              { name: "firstName", placeholder: "First Name", type: "text" },
              { name: "lastName", placeholder: "Last Name", type: "text" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "password", placeholder: "Password", type: "password" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                type={field.type}
                className="p-3 rounded-none focus:outline-none mb-4 w-full xs:max-w-lg sm:rounded-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
              />
            ))}
            <section className="relative flex flex-col justify-center items-center xs:flex-row xs:px-3 mb-4 w-full xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
              <button type="submit" className="candy-button w-48 mb-2" disabled={isLoading}>
                Register
              </button>
              <div className="flex relative right-auto mt-6 h-12 px-4 hover:underline sm:absolute sm:mt-0 sm:right-0">
                <Link to="/login" className="flex h-full items-center text-purple-500 hover:text-purple-700 ">
                  Sign In
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

export default Register;
