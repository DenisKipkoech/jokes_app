import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeWrapper from "./theme";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeWrapper>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <CssBaseline />
    </ThemeWrapper>
  );
}

export default App;
