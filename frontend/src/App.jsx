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
import PageAdmin from "./components/PageAdmin";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const [isUpdated, setIsUpdated] = useState(false);
  const { userId } = useAuth();
  const [usersDatas, setUsersDatas] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUsersDatas(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  return (
    <div className={styles.appForm}>
      <Header usersDatas={usersDatas} />
      <div className={styles.bodyForm}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Menu />} />
          <Route
            path="/demands/create"
            element={<CreatePage setIsUpdated={setIsUpdated} />}
          />
          <Route
            path="/demands/vote"
            element={<VotePage isUpdated={isUpdated} />}
          />
          <Route
            path="/demands/valid"
            element={<ValidPage isUpdated={isUpdated} />}
          />
          <Route path="/Profil" element={<Profil usersDatas={usersDatas} />} />
          <Route
            path="/demands/update/:id"
            element={<CreatePage setIsUpdated={setIsUpdated} />}
          />
          <Route path="/Admin" element={<PageAdmin />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
