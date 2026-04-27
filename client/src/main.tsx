import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./setup/queryClient.ts";
import GalleryContextProvider from "./context/GalleryContextProvider.tsx";
import UserContextProvider from "./context/UserContextProvider.tsx";
import ModalContextProvider from "./context/ModalContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <GalleryContextProvider>
            <ModalContextProvider>
              <App />
            </ModalContextProvider>
          </GalleryContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>,
);
