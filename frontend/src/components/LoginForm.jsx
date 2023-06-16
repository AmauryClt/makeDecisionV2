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
          <h1>make decision</h1>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <figcaption>
          <img src="makesense_accueil.jpg" alt="" />
        </figcaption>
      </main>
    );
  }
}
export default LoginForm;
