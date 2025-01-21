import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
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
      <AccountCircleIcon />
      MenuIcon
      <article className="flex items-center">
        <div>
          <img src={cupcakeLogo} className={styles.logo} alt="Frosting logo" />
        </div>
        <h1>Frosting!</h1>
      </article>
      <ul className={styles.list}>
        <li>
          <Link to="/show-listing">Show Listing</Link>
        </li>
        <li>
          <Link to="/show-reminders">Show Reminders</Link>
        </li>
        <li>Livestream Links</li>
      </ul>
      <article className={styles.buttonContainer}>
        <button className="w-48" onClick={handleLogout}>
          Logout
        </button>
      </article>
    </section>
  );
};

export default Navbar;
