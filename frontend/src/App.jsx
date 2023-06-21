import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import VotePage from "./components/VotePage";
import ValidPage from "./components/ValidPage";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/VotePage" element={<VotePage />} />
          <Route path="/ValidPage" element={<ValidPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
