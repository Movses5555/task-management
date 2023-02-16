import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

import List from "./components/list";
import Nav from "./components/nav";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { dark, light } from "theme";
import { Box } from "@mui/material";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <Box
        sx={{ backgroundColor: "primary.dark" }}
        className="w-screen h-screen overflow-x-hidden"
      >
        <Nav toggleTheme={changeTheme} />
        <List />
      </Box>
      {ReactDOM.createPortal(
        <ToastContainer className="toaster" hideProgressBar autoClose={3000} />,
        document.getElementById("toasts")
      )}
    </ThemeProvider>
  );
}

export default App;
