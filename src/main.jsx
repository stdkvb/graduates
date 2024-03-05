import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import UserProvider from "./utils/context";

import App from "./App.jsx";
import "./assets/styles/index.scss";
import theme from "./theme.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </ThemeProvider>
);
