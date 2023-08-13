import { Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../theme";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function Header() {
  const theme = useTheme();
  const muiUtils = useContext(ThemeContext);

  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem("key");
    navigate("/login");
  };

  return (
    <Stack direction={"row"} justifyContent={"space-between"} mb={8}>
      <div>
        <Typography variant="h5">Jokes App</Typography>
      </div>

      <Stack direction={"row"} spacing={2}>
        <IconButton onClick={muiUtils.toggleColorMode}>
          {theme.palette.mode === "light" ? (
            <DarkMode />
          ) : (
           <LightMode />
          )}
        </IconButton>

        <Button variant="outlined" onClick={onLogOut} size="small">
          Log Out
        </Button>
      </Stack>
    </Stack>
  );
}
