import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
  };
  handleUserChange = (e) => {
    this.setState({ username: e.target.username });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.password });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <form className="formLogin" onSubmit={this.handleSubmit}>
        <h2>Log In</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={this.handleUserChange}
            value={this.state.username}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <button>Login</button>
      </form>
    );
  }
}

export default LoginForm;
