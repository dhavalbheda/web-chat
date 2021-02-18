import React, { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ScrollToBottom from 'react-scroll-to-bottom';
import Picker from 'emoji-picker-react';

// User Define
import './../Utils/css/font-awesome.css';
// import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms, getConversation, removeLister, saveMessage } from "../../Redux/Room/RoomAction";
import Sidebar from './Sidebar';
import ConversationComponent from './ConversationComponent';
import chatImage from '../Utils/images/chat-image.png'
import sendIcon from '../Utils/images/send-icon.png';

const Room = () => {
    const { user } = useSelector(state => state.User);
    const { rooms, conversation } = useSelector(state => state.Room);
    const [startChat, setStartChat] = useState(false);
    const [ selectedRoom, setSelecedRoom ] = useState({});
    const [text, setText] = useState('');
    const [emojiPickerClick, setEmojiPickerClick] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);

    useEffect(() => {
      return () => removeLister(selectedRoom.uid);
    },[selectedRoom]);

    // Room Click Event Listener
    const selectRoom = (room) => {
        if(selectedRoom && selectedRoom.uid === room.uid)
        return;

        // If Firsh Time Click
        if(!startChat)
            setStartChat(true);
        
        setSelecedRoom(room);
        setEmojiPickerClick(false);
        setText('');
        dispatch(getConversation(room.uid));
    }

    // Message Send Button
  const sendMessage = () => {
    if(text === '')
      return;
    const data = {
      uuid: uuidv4(),
      name: user.firstName + " "+ user.lastName,
      sender: user.uid,
      roomid: selectedRoom.uid,
      message: text
    }
    saveMessage(data);
    setText('');
  }

  // Emoji Button Click Listener
  const onEmojiClick = (event, {emoji}) => {
    setText(text +  emoji);
  };

   //Body Click 
   const containerBodyClick = () => {
    if(window.innerWidth < 600) {
      const bar = document.getElementsByClassName('navigation')[0];
      if(bar.offsetWidth > 55) {
          bar.style.width = "55px";
          document.getElementsByClassName('bar-area')[0].style.width = "55px";
      }
    }
  }
  return <Fragment>
        <div className="main-container">
          {/* <!-- Sidebar --> */}
          <Sidebar
              uid={user.uid}
              rooms={rooms}
              selectRoom={selectRoom}
              selectedRoom={selectedRoom} />
          
          {/* <!-- Chat Body --> */}
          <div className="container-body" onClick={containerBodyClick}>
            {/* <!-- Chat Header --> */}
            {startChat 
            ? <Fragment>
                <div className="friend-name">
                    <span>{startChat && selectedRoom.name}</span>
                </div>

                {/* Message Area */}
                <ScrollToBottom className="message-section">
                  {
                    startChat && <ConversationComponent 
                                    conversation = {conversation}
                                    selectedRoom = {selectedRoom} 
                                    user = {user} />
                  }
                </ScrollToBottom>

                {/* <!-- Control Area --> */}
                <ControlComponent 
                            text={text} 
                            setText={setText}
                            setEmojiPickerClick={setEmojiPickerClick}
                            sendMessage={sendMessage}
                            emojiPickerClick={emojiPickerClick}
                            onEmojiClick={onEmojiClick} />
              </Fragment>
            : <div className="chat-image-div">
                <img className="temp" style={{width:'100%'}} src={chatImage} alt="" />
              </div>
                  
            }
          </div>      
        </div>
    </Fragment>
}


const ControlComponent = ({text, setText, setEmojiPickerClick, sendMessage, emojiPickerClick, onEmojiClick}) => {
    return <Fragment>
      <div className="chat-control">
        <div className="control">
            <textarea
                    placeholder = 'Enter Text...'
                    value = {text}
                    onChange = {e => {
                        setText(e.target.value)
                    }}>
            </textarea>
            <span className="smile-icon" onClick={e=> setEmojiPickerClick(!emojiPickerClick)}><i className="fas fa-smile"></i></span>
            <span className="send-icon" onClick={sendMessage}>
              <img style={{width: '30px'}} src={sendIcon} alt="" />
            </span>
        </div>
        {emojiPickerClick && <Picker onEmojiClick={onEmojiClick} />}
      </div>
    </Fragment>
  }

export default Room;