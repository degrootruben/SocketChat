import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import "./index.css";
import CssBaseLine from "@material-ui/core/CssBaseline";
import App from "./App";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: purple[300]
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
