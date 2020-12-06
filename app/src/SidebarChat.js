import React from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  return (
    <div
      className="sidebarChat"
      onClick={() => {
        dispatch(setChat({ chatId: id, chatName: chatName }));
      }}
    >
      <Avatar />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>last text...</p>
        <small>timestamp</small>
      </div>
    </div>
  );
}

export default SidebarChat;
