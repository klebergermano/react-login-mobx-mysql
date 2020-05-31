import { extendObservable } from "mobx";

class UserStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      isLoggedIn: true,
      username: "Fulanox de Talvinson",
    });
  }
}

export default new UserStore();
