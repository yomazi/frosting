import axios from "axios";
import { useState } from "react";
import styles from "../styles/auth.module.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [shouldShowSuccessMessage, setShouldShowSuccessMessage] =
    useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/register", formData);

      console.log(response);
      setShouldShowSuccessMessage(true);
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShouldShowSuccessMessage(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="auth" className="flex flex-col items-center mt-8">
      <h1 className="mb-8">Register a New User</h1>
      <article className="flex flex-col">
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
            className="p-2 rounded-md focus:outline-none mb-4"
          />
        ))}
        <button onClick={handleRegister}>Register</button>
      </article>
      <article
        className={`${styles.authSuccessMessage} flex items-center h-16`}
      >
        {shouldShowSuccessMessage ? "User created successfully" : ""}
      </article>
      <div>
        <a href="/login">Login as an existing user instead</a>
      </div>
    </section>
  );
};

export default Register;
