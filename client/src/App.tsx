import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import HandleRoutes from "./Routes/HandleRoutes";
import NavPage from "./Components/NavComp/NavPage";
import { useAxiosInterceptor } from "./Hooks/useAxiosInterceptor";

export default function App() {
  useAxiosInterceptor();

  return (
    <Router>
      <Toaster position="top-right" />

      <div className="flex min-h-screen">
        <NavPage />

        <div className="flex-1 flex flex-col min-h-0">
          <HandleRoutes />

          <Footer />
        </div>
      </div>
    </Router>
  );
}
