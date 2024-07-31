import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex flex-wrap w-full justify-center">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>

          <div>
            <TopSellers />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
