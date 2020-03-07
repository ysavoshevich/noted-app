import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import "./index.css";
import { App } from "./components/app/index";

Sentry.init({
  dsn: "https://7f099ff07bfb484f9ad730386ad2c130@sentry.io/2637593"
});

ReactDOM.render(<App />, document.getElementById("root"));
