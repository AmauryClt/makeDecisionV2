import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import CreatePage from "./components/CreatePage";
import VotePage from "./components/VotePage";
import ValidPage from "./components/ValidPage";
import Footer from "./components/Footer";
import Login from "./components/LoginForm";
import Profil from "./components/Profil";
import styles from "./app.module.scss";
import { useUser } from "./contexts/UserContext";

function App() {
  const { user } = useUser();
  const [usersDatas, setUsersDatas] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${user}`)
        .then((response) => response.json())
        .then((data) => {
          setUsersDatas(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return (
    <div className={styles.appForm}>
      <Header usersDatas={usersDatas} />
      <div className={styles.bodyForm}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Menu />} />
          <Route path="/demands/create" element={<CreatePage />} />
          <Route path="/demands/vote" element={<VotePage />} />
          <Route path="/demands/valid" element={<ValidPage />} />
          <Route path="/Profil" element={<Profil usersDatas={usersDatas} />} />
          <Route path="/demands/update/:id" element={<CreatePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
