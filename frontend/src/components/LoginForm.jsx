import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.scss";
import { useUser } from "../contexts/UserContext";

function LoginForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const form = useRef(null);
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form.current));
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          setErrors(json);
        } else {
          setUser(json.user);
          navigate("/");
          console.info(json.user);
        }
      });
  };
  return (
    <main className={styles.mainHome}>
      <form className={styles.labelStyles} ref={form} onSubmit={handleSubmit}>
        <h2>Login</h2>

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
          <button className={styles.button} type="submit">
            Se connecter
          </button>
        </div>
      </form>
      <div>
        <img src="./src/assets/makesenseaccueil.jpg" alt="connect" />
      </div>
    </main>
  );
}
export default LoginForm;
