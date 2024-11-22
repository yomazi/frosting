import { getAuth, signOut } from "firebase/auth";
import styles from "../styles/navbar.module.scss";
import cupcakeLogo from "/cupcake.svg";

const Navbar = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      const response = await signOut(auth);

      onLogout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id={styles.navbar} className="flex justify-between">
      <article className="flex items-center">
        <div>
          <img src={cupcakeLogo} className="logo" alt="Frosting logo" />
        </div>
        <h1>Frosting!</h1>
      </article>
      <article className={styles.buttonContainer}>
        <button onClick={handleLogout}>Logout</button>
      </article>
    </section>
  );
};

export default Navbar;
