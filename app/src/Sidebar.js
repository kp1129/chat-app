import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { setChat } from './features/chatSlice';
import db, { auth } from "./firebase";

function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
 
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (chats.length > 0) {
      dispatch(setChat({ chatId: chats[0].id, chatName: chats[0].data.chatName }))
    }
  }, [chats.length])

  useEffect(() => {
    db.collection('chats').onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const addChat = () => {      
      const chatName = prompt('Please enter a chat name');

      if (chatName) {
        db.collection('chats').add({
            chatName: chatName
        })
      }      
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={user.photo}
          onClick={() => auth.signOut()}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <IconButton variant="outlined" className="sidebar__inputButton" onClick={addChat}>
          <RateReviewOutlinedIcon  />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
