import React from "react";
import logo from "assets/images/logo.png";
import {
  NightlightRounded,
  NightlightRoundSharp,
  WbSunny,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
function Nav({ toggleTheme }) {
  const theme = useTheme();
  return (
    <Box
      sx={{ bgcolor: "primary.light" }}
      className={`w-full flex items-center justify-between shadow px-8 font-medium`}
    >
      <div className="flex items-center">
        <div className="w-16 h-16 cursor-pointer">
          <img src={logo} className="w-full h-full object-cover" />
        </div>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
          as="h3"
          color="secondary.main"
        >
          TM
        </Typography>
      </div>
      <IconButton
        sx={{ color: "secondary.main" }}
        onClick={toggleTheme}
        className="cursor-pointer"
      >
        {theme.palette.mode === "dark" ? <WbSunny /> : <NightlightRoundSharp />}
      </IconButton>
    </Box>
  );
}

export default Nav;
