import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CreatePage from "./components/CreatePage";
import VotePage from "./components/VotePage";
import ValidPage from "./components/ValidPage";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Profil from "./components/Profil";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/CreatePage" element={<CreatePage />} />
          <Route path="/VotePage" element={<VotePage />} />
          <Route path="/ValidPage" element={<ValidPage />} />
          <Route path="/Profil" element={<Profil />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
