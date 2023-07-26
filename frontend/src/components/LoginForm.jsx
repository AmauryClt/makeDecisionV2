import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styles from "./loginForm.module.scss";
import { useUser } from "../contexts/UserContext";
import accueil from "../assets/makesenseaccueil.jpg";

function LoginForm({ toastOptions }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const form = useRef(null);
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form.current));
    fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          setErrors(json);
        } else {
          setUser(json.user);
          navigate("/");
          toast.success("Bienvenue !!!", toastOptions);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          "Impossible de se connecter, avez-vous vérifié votre login et mot de passe ?",
          toastOptions
        );
      });
  };
  return (
    <main className={styles.mainHome}>
      <form className={styles.labelStyles} ref={form} onSubmit={handleSubmit}>
        <h2 className={styles.titleMake}>Make A Decision</h2>

        {errors.message && <p>{errors.message}</p>}
        <div className={styles.Username}>
          <label>
            <input
              className={styles.inputUsername}
              type="text"
              name="username"
              placeholder="Identifiant"
            />
          </label>
        </div>
        <div className={styles.Password}>
          <label>
            <input
              className={styles.inputPassword}
              type="password"
              name="password"
              placeholder="mot de passe"
            />
          </label>
        </div>

        <div className={styles.login}>
          <button className={styles.loginbutton} type="submit">
            LOGIN
          </button>
        </div>
      </form>
      <img className={styles.imglogin} src={accueil} alt="connect" />
    </main>
  );
}
export default LoginForm;

LoginForm.propTypes = {
  toastOptions: PropTypes.shape.isRequired,
};
