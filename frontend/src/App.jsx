import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Menu from "./components/Menu";
import CreatePage from "./components/CreatePage";
import VotePage from "./components/VotePage";
import ValidPage from "./components/ValidPage";
import Footer from "./components/Footer";
import Login from "./components/LoginForm";
import Profil from "./components/Profil";
import styles from "./app.module.scss";
import { useAuth } from "./contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";

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

  const toastOptions = {
    position: "top-center",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  return (
    <div className={styles.appForm}>
      <Header usersDatas={usersDatas} />
      <ToastContainer />
      <div className={styles.bodyForm}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Menu />} />
          <Route
            path="/demands/create"
            element={
              <CreatePage
                setIsUpdated={setIsUpdated}
                toastOptions={toastOptions}
              />
            }
          />
          <Route
            path="/demands/vote"
            element={<VotePage isUpdated={isUpdated} />}
          />
          <Route
            path="/demands/valid"
            element={<ValidPage isUpdated={isUpdated} />}
          />
          <Route
            path="/Profil"
            element={
              <Profil usersDatas={usersDatas} toastOptions={toastOptions} />
            }
          />
          <Route
            path="/demands/update/:id"
            element={<CreatePage setIsUpdated={setIsUpdated} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
