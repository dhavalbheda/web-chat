import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ScrollToBottom from 'react-scroll-to-bottom';
import Picker from 'emoji-picker-react';

// User Define
import './../Utils/css/font-awesome.css';
import './style.css';
import { getAllFriends, getConversation, removeLister, saveMessage } from '../../Redux/Chat/ChatActions';

/**
* @author DhavalBheda
* @function Chat
**/

const Chat = (props) => {
  const { user } = useSelector(state => state.User);
  const { conversation } = useSelector(state => state.Chat);
  const { friends } = useSelector(state => state.Chat);
  const [startChat, setStartChat] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({});
  const [text, setText] = useState('');
  const [emojiPickerClick, setEmojiPickerClick] = useState(false);
  const dispatch = useDispatch();

  let unsubscribe;
  useEffect(() => {
      unsubscribe = dispatch(getAllFriends(user.uid))
      .then(unsubscribeMehod => unsubscribeMehod)
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    return () => removeLister(user.uid, selectedFriend.uid);
  }, [selectedFriend]);
  

  const selectFriend = (friend) => {
    if(selectedFriend && selectedFriend.uid === friend.uid)
      return;
      console.log(friend.uid);
    setStartChat(true);
    setEmojiPickerClick(false);
    setText('');
    setSelectedFriend(friend);  
    dispatch(getConversation({
        sender: user.uid,
        receiver: friend.uid}))
  }

  const sendMessage = () => {
    setText('');
    const data = {
      uuid: uuidv4(),
      sender: user.uid,
      receiver: selectedFriend.uid,
      message: text
    }
    saveMessage(data);
  }

  const onEmojiClick = (event, {emoji}) => {
    setText(text +  emoji);
  };

  const barClick = () => {
    const bar = document.getElementsByClassName('navigation')[0];
    if(bar.offsetWidth < 300) {
      bar.style.width = "300px";
    } else {
      bar.style.width = "55px";
    }
  }
  return(
        <Fragment>
        <div className="main-container">
            {/* <!-- Header --> */}
            {/* <header className="header">
                <div className="logo">
                    <span>Digital</span>
                </div>
                <span>Dhaval Bheda</span>
                <span className="logout"><i class="fas fa-sign-out-alt"></i></span>
            </header> */}

            {/* <!-- Sidebar --> */}
            <div className="navigation">
                <div className="bar-area">
                    <span className="icon bar-icon" onClick={barClick}><i className="fas fa-bars"></i></span>
                </div>
                <ul>
                    {friends.length > 0 && <LoadFriends uid={user.uid} selectFriend={selectFriend} friends={friends} selectedFriend={selectedFriend} />}
                </ul>
            </div>
            
            {/* <!-- Chat Body --> */}
            <div className="container-body">
                {/* <!-- Chat Header --> */}
                <div className="friend-name">
                    <span>{startChat && selectedFriend.firstName + " " + selectedFriend.lastName}</span>
                </div>
                
                {/* Message Area */}
                <ScrollToBottom className="message-section">
                    {
                        startChat && <ChatComponent conversation = {conversation} selectedFriend = {selectedFriend} user = {user}  />
                    }
                </ScrollToBottom>
                {/* <!-- Control Area --> */}
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
                        <span className="send-icon" onClick={sendMessage}><i className="fas fa-paper-plane"></i></span>
                    </div>
                {emojiPickerClick && <Picker onEmojiClick={onEmojiClick} />}

                </div>

            </div>
        </div>
    </Fragment>
   )
}

const LoadFriends = ({friends, selectFriend, uid, selectedFriend}) => {
  const addClass = (friend, uid) => {
    if(friend.pendding) {
      if(friend.pendding.includes(uid)) {
        return 'displayPic pending'
      } else {
        return 'displayPic'
      }
    } else {
      return 'displayPic'
    }
  }

  return friends.map((friend, index) => 
    <li key={index}>
        <div style={selectedFriend.uid === friend.uid ? {background: '#b1b1b1'} : {}} key={index} onClick = {() => selectFriend(friend)}>
            <span className="icon"><img className="icon" src="https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg" alt="" /></span>
            <span className="title">{friend.firstName + " " + friend.lastName}</span>
            {/* <span>{friend.isActive ? 'Active' : 'offline'}</span> */}
        </div>
    </li>
  )
}

const ChatComponent = ({conversation, selectedFriend, user}) => {
  
  const sortCoversation = (data) => {
    data.sort((a, b) => a.createdAt - b.createdAt);
  }

  sortCoversation(conversation)
  return conversation.map((item, key) => {
    let createdAt = undefined;
    if(item.createdAt != null) {
      let options = { day: 'numeric', month: 'short'};
      createdAt = new Date(item.createdAt).toLocaleString('en', options);
      createdAt += " " + new Date(item.createdAt).toLocaleTimeString([], {timeStyle: 'short'});
    }

    return (item.sender === selectedFriend.uid && item.receiver === user.uid) || (item.sender === user.uid && item.receiver === selectedFriend.uid)
    ? <Fragment key={key}>
        <div style={{ textAlign: item.sender === user.uid ? 'right' : 'left'}}>
            <p className={item.sender === user.uid ? 'messageStyle right-message' : 'messageStyle left-message'} >{item.message}<br/>
              <span className="message-time">{ createdAt? createdAt : '' }</span>
              {item.receiver !== user.uid && <span className="message-status">{item.isSeen ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>}</span>}
            </p>
        </div>
      </Fragment>
    : <Fragment key={key}></Fragment>
  })
}

export default Chat;