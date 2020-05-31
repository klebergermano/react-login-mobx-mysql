import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FormLogin from "./component/formLogin";
import "./assets/css/style.css";
export const AppContext = createContext();

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userStore = {
    username: { get: username, set: setUsername },
    loading: { get: loading, set: setLoading },
    isLoggedIn: { get: isLoggedIn, set: setIsLoggedIn },
  };

  useEffect(() => {
    (async () => {
      fetch("/isLoggedIn", { method: "post" })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.success) {
            userStore.loading.set(false);

            userStore.username.set(res.username);
            userStore.isLoggedIn.set(true);
          } else {
            userStore.isLoggedIn.set(false);
            userStore.loading.set(false);
          }
        });
    })();
  });

  const doLogout = () => {
    fetch("/logout", { method: "post" })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success) {
          userStore.loading.set(false);
          userStore.username.set("");
          userStore.isLoggedIn.set(false);
        }
      });
  };

  if (userStore.loading.get) {
    return <div>Is Loading ...</div>;
  } else {
    if (userStore.isLoggedIn.get) {
      return (
        <div>
          Bem vindo: {userStore.username.get}
          <br />
          <button onClick={doLogout}>Logout</button>
        </div>
      );
    } else {
      return (
        <AppContext.Provider value={{ userStore }}>
          <div className="App">
            <div className="container">
              <div id="content">
                <FormLogin />
              </div>
              {/* content */}
            </div>
            ;
          </div>
        </AppContext.Provider>
      );
    }
  }
}

export default App;
