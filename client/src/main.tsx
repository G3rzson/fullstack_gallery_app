import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import AppProviders from "./AppProviders.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AppProviders>
        <App />
      </AppProviders>
    </Router>
  </StrictMode>,
);
