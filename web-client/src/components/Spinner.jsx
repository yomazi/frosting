import { Backdrop, CircularProgress } from "@mui/material";

const Spinner = ({ openOn }) => {
  const valueToOpenOn = openOn != undefined ? openOn : true;

  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: "absolute",
        transition: "opacity 0.3s ease-in-out",
      }}
      open={valueToOpenOn}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Spinner;
