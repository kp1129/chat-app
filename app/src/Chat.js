import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNoneOutlined";
import "./Chat.css";
import Message from "./Message";

function Chat() {
  const [userInput, setUserInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    // clear the form input
    setUserInput("");
  };
  return (
    <div className="chat">
      {/* header */}
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">name</span>
        </h4>
        <strong>Details</strong>
      </div>

      {/* messages */}
      <div className="chat__messages">
          <Message />
          <Message />
          <Message />
      </div>

      {/* input */}
      <div className="chat__input">
        <form>
          <input
            type="text"
            placeholder="iMessage"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
          
        </form>
        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>        
      </div>
    </div>
  );
}

export default Chat;
