import React, { Component } from "react";
import UserStore from "./stores/UserStore";

import FormLogin from "./component/formLogin";
import "./assets/css/style.css";
class App extends Component {
  changeUserStore = () => {
    UserStore.set("kleberusx");
  };
  async componentDidMount() {
    UserStore.loading = false;
    UserStore.isLoggedIn = true;
    UserStore.username = "Kleberus";
    console.log(UserStore);
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
        console.log(UserStore);
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      console.log(e);
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
        console.log("react fetch Logout");
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    if (UserStore.loadingx) {
      console.log(UserStore.loading);
      return (
        <div className="App">
          <button onClick={this.changeUserStore}>Change 2</button>
          <h1>Is Loading ...</h1>
          -- {UserStore.loading} --
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="App">
            <h1>{UserStore.username} - Is Logged In</h1>
            <button onClick={this.changeUserStore}>Change 3</button>
            <br />
            <br />

            <button onClick={this.doLogout}>Logout</button>
          </div>
        );
      } else {
        return (
          <div className="App">
            <button onClick={this.changeUserStore}>Change 1</button>
            <FormLogin />
          </div>
        );
      }
    }
  }
}

export default App;
