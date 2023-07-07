import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import CreatePage from "./components/CreatePage";
import VotePage from "./components/VotePage";
import ValidPage from "./components/ValidPage";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Profil from "./components/Profil";
import styles from "./app.module.scss";

function App() {
  return (
    <Router>
      <div className={styles.appForm}>
        <Header />
        <div className={styles.bodyForm}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/CreatePage" element={<CreatePage />} />
            <Route path="/VotePage" element={<VotePage />} />
            <Route path="/ValidPage" element={<ValidPage />} />
            <Route path="/Profil" element={<Profil />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
