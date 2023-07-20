import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import CreatePage from "./components/CreatePage";
import VotePage from "./components/VotePage";
import ValidPage from "./components/ValidPage";
import Footer from "./components/Footer";
import Login from "./components/LoginForm";
import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.appForm}>
      <Header />
      <div className={styles.bodyForm}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Menu />} />
          <Route path="/demands/create" element={<CreatePage />} />
          <Route path="/demands/vote" element={<VotePage />} />
          <Route path="/demands/valid" element={<ValidPage />} />
          <Route path="/demands/update/:id" element={<CreatePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
