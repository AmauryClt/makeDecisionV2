import { Routes, Route } from "react-router-dom";
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
import "react-toastify/dist/ReactToastify.css";

function App() {
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
      <Header toastOptions={toastOptions} />
      <ToastContainer />
      <div className={styles.bodyForm}>
        <Routes>
          <Route
            path="/login"
            element={<Login toastOptions={toastOptions} />}
          />
          <Route path="/" element={<Menu />} />
          <Route
            path="/demands/create"
            element={<CreatePage toastOptions={toastOptions} />}
          />
          <Route
            path="/demands/vote"
            element={<VotePage toastOptions={toastOptions} />}
          />
          <Route path="/demands/valid" element={<ValidPage />} />
          <Route
            path="/demands/update/:id"
            element={<CreatePage toastOptions={toastOptions} />}
          />
          <Route path="/Profil" element={<Profil />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
export default App;
