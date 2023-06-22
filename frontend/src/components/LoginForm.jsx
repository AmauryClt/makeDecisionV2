import React from "react";
import styles from "./loginForm.module.scss";

function LoginForm() {
  return (
    <main className={styles.mainHome}>
      <form className={styles.labelStyles}>
        <h1 className={styles.bigTitle}>make decision</h1>
        <label>
          <div className={styles.Username}>
            <input
              className={styles.inputUsername}
              type="username"
              name="username"
              placeholder="Adresse@mail.fr"
            />
          </div>
        </label>
        <label>
          <div className={styles.Password}>
            <input
              className={styles.inputPassword}
              type="password"
              name="password"
              placeholder="Mot de passe"
            />
          </div>
        </label>
        <div className={styles.login}>
          <button className={styles.button} type="submit">
            LOGIN
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
