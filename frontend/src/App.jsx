import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import CreatePage from "./components/CreatePage";
import VotePage from "./components/VotePage";
import ValidPage from "./components/ValidPage";
import Footer from "./components/Footer";
import Login from "./components/LoginForm";
import Profil from "./components/Profil";
import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.appForm}>
      <Header />
      <div className={styles.bodyForm}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Menu />} />
          <Route path="/CreatePage" element={<CreatePage />} />
          <Route path="/VotePage" element={<VotePage />} />
          <Route path="/ValidPage" element={<ValidPage />} />
          <Route path="/Profil" element={<Profil />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
