import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNoneOutlined";
import "./Chat.css";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChatId, selectChatName } from "./features/chatSlice";
import db from "./firebase";
import firebase from 'firebase';
import { selectUser } from "./features/userSlice";

function Chat() {
  const user = useSelector(selectUser);
  const [userInput, setUserInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.reverse().map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('chats').doc(chatId).collection('messages').add({
      // timezone-consistent timestamp
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // message
      message: userInput,
      // user data
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName
    })

    // clear the form input
    setUserInput("");
  };
  return (
    <div className="chat">
      {/* header */}
      <div className="chat__header">
        <h4>
          To:{" "}
          <span className="chat__name">
            {chatName ? chatName : "chat name will go here"}
          </span>
        </h4>
        <strong>Details</strong>
      </div>
      
      {/* messages */}
      <div className="chat__messages">
        {messages.map(({ id, data }) => (
          <Message key={id} contents={data} />
        ))}
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
