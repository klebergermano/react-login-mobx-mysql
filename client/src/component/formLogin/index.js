import React, { useContext, useState } from "react";
import { AppContext } from "../../App";

const LoginForm = () => {
  const context = useContext(AppContext);
  const userStore = context.userStore;
  const [inputUsername, setInputUsername] = useState();
  const [inputPassword, setInputPassword] = useState();

  const handleUsernameChange = (e) => {
    let inputUsername = e.target.value;
    setInputUsername(inputUsername);
  };
  const handlePasswordChange = (e) => {
    let inputPassword = e.target.value;
    setInputPassword(inputPassword);
  };
  const doLogin = (e) => {
    e.preventDefault();
    if (!inputUsername) {
      return;
    }
    if (!inputPassword) {
      return;
    }

    let data = {
      inputUsername,
      inputPassword,
    };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          userStore.username.set(res.username);
          userStore.isLoggedIn.set(true);
          console.log(userStore);
        } else if (res && res.success === false) {
          alert(res.msg);
        }
      });
  };
  return (
    <div>
      <form className="formLogin" onSubmit={doLogin}>
        <h2>Log In</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleUsernameChange}
            value={inputUsername}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handlePasswordChange}
            value={inputPassword}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
