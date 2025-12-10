import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import HandleRoutes from "./Routes/HandleRoutes";
import PageNav from "./Components/NavComp/PageNav";

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />

      <div className="flex min-h-screen">
        <PageNav />

        <div className="flex-1 flex flex-col min-h-0">
          <HandleRoutes />

          <Footer />
        </div>
      </div>
    </Router>
  );
}
