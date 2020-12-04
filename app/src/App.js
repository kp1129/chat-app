import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from './firebase';
import IMessage from "./IMessage";
import Login from './Login';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // login
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        // logout
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">{user ? <IMessage /> : <Login />}</div>
  );
}

export default App;
