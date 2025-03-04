import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NavbarDropdown = ({ items, children }) => {
  const listRef = useRef(null);
  const [anchorElement, setAnchorElement] = useState(null);
  const handleOpen = (event) => setAnchorElement(event.currentTarget);
  const handleClose = () => setAnchorElement(null);

  useEffect(() => {
    document.addEventListener("keydown", handleClose);
    window.addEventListener("resize", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
      window.removeEventListener("resize", handleClose);
    };
  }, []);

  return (
    <Box>
      <IconButton color="inherit" onClick={handleOpen}>
        {children}
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        disableScrollLock={true}
        disablePortal={true}
        disableEnforceFocus={true}
      >
        <Box ref={listRef}>
          {items.map((item, index) => (
            <MenuItem key={index} component={Link} to={item.to}>
              {item.caption}
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default NavbarDropdown;
