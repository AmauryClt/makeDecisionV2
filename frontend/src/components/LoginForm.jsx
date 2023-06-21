import React from "react";
import styles from "./loginForm.module.scss";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // eslint-disable-next-line class-methods-use-this
  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { username, password } = this.state;

    return (
      <main className={styles.mainHome}>
        <form className={styles.labelStyles} onSubmit={this.handleSubmit}>
          <div>
            <img src="./src/assets/makesenseaccueil.jpg" alt="connect" />
          </div>
          <h1>make decision</h1>
          <label>
            <div className={styles.Username}>
              Username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleInputChange}
              />
            </div>
          </label>
          <label>
            <div className={styles.Password}>
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>
          </label>
          <div className={styles.login}>
            <button type="submit">Login</button>
          </div>
        </form>
      </main>
    );
  }
}
export default LoginForm;
