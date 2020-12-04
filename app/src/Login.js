import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";

import "./Login.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://cdn2.iconfinder.com/data/icons/ios7-inspired-mac-icon-set/1024/messages_5122x.png"
          alt="iMessage logo"
        />
        <h1>iMessage</h1>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
