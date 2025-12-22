import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import GlobalContextProvider from "./GlobalContext/GlobalContextProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import AxiosInterceptorProvider from "./Axios/AxiosInterceptorProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { queryClient } from "./ReactQuery/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <AxiosInterceptorProvider>
            <App />
          </AxiosInterceptorProvider>
        </GlobalContextProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
