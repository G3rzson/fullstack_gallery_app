import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { ROUTES } from "./Routes/Routes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <Header />
      <main className="grow">
        <Toaster position="top-right" />
        <Routes>
          {ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
