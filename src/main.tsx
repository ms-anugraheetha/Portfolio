import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource-variable/nunito";
import "@fontsource/chewy";
import "@fontsource/gochi-hand";
import "@fontsource/patrick-hand";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
