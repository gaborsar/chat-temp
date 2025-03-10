import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

const container = document.getElementById("root");
if (container === null) {
  throw new Error();
}
const root = createRoot(container);
root.render(<App />);
