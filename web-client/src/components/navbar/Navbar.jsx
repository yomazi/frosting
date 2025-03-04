import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/auth-slice";
import NavigationService from "../../services/navigation-service";
import styles from "../../styles/navbar.module.scss";
import NavbarDropdown from "./NavbarDropdown";
import cupcakeLogo from "/cupcake.svg";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const menuItems = NavigationService.getMenuItems();
  const userItems = NavigationService.getUserItems();

  const handleLogout = async () => {
    try {
      const auth = getAuth();

      await signOut(auth);

      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="navbar" className="flex justify-between items-center">
      <article className="flex items-center">
        <div>
          <img src={cupcakeLogo} className={styles.logo} alt="Frosting logo" />
        </div>
        <h1>Frosting!</h1>
      </article>
      <article className="flex mr-6">
        <NavbarDropdown items={menuItems}>
          <MenuIcon sx={{ color: "#7b1fa2", "&:hover": { color: "#4b0082" }, fontSize: "3rem" }} />
        </NavbarDropdown>
        <NavbarDropdown items={userItems}>
          <AccountCircleIcon sx={{ color: "#7b1fa2", "&:hover": { color: "#4b0082" }, fontSize: "3rem" }} />
        </NavbarDropdown>
        <button className="candy-button w-48" onClick={handleLogout}>
          Logout
        </button>
      </article>
    </section>
  );
};

export default Navbar;
