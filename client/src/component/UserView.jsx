import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserView = () => {
  const context = useContext(UserContext);

  console.log(context.userStore.username);

  return <div>User List: {context.userStore.username} </div>;
};
export default UserView;
