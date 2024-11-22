import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldShowSuccessMessage, setShouldShowSuccessMessage] =
    useState(false);

  const register = async () => {
    try {
      console.log(`sending: ${email} ${password}`);
      const response = await axios.post("/api/register", {
        email,
        password,
      });
      console.log(response);
      setShouldShowSuccessMessage(true);
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
    }
  };

  return (
    <section>
      <h2>Register a New user</h2>
      <a href="/login">Login as an existing user instead</a>
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
        <button onClick={register}>Register</button>
      </article>
      {shouldShowSuccessMessage && (
        <div style={{ color: "green" }}>User created successfully.</div>
      )}
    </section>
  );
};

export default Register;
