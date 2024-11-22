import { getAuth, signOut } from "firebase/auth";
import styles from "../styles/navbar.module.scss";
import cupcakeLogo from "/cupcake.svg";

const Navbar = ({ setIsLoggedIn }) => {
  const logout = async () => {
    try {
      const auth = getAuth();
      const response = await signOut(auth);

      localStorage.removeItem("frostingUserToken"); // Clear token
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id={styles.navbar}>
      <div>
        <img src={cupcakeLogo} className="logo" alt="Frosting logo" />
      </div>
      <div class={styles.banner}>
        <h1>Frosting!</h1>
        <div>A sanity-inducing tool for the Freight.</div>
      </div>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </section>
  );
};

export default Navbar;
