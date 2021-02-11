import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ScrollToBottom from 'react-scroll-to-bottom';
import Picker from 'emoji-picker-react';

// User Define
import './../Utils/css/font-awesome.css';
import './style.css';
import { getAllFriends, getConversation, removeLister, saveMessage } from '../../Redux/Chat/ChatActions';
import ConversationComponent from './ConversationComponent';

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
  

   // Friend Click Listener
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

  // Message Send Button
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

  // Emoji Button Click Listener
  const onEmojiClick = (event, {emoji}) => {
    setText(text +  emoji);
  };

  // Bar Click Listener
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
                      startChat && <ConversationComponent 
                                      conversation = {conversation}
                                      selectedFriend = {selectedFriend} 
                                      user = {user}/>
                    }
                </ScrollToBottom>
                {/* <!-- Control Area --> */}
                {
                  startChat && <ControlComponent 
                                text={text} 
                                setText={setText}
                                setEmojiPickerClick={setEmojiPickerClick}
                                sendMessage={sendMessage}
                                emojiPickerClick={emojiPickerClick}
                                onEmojiClick={onEmojiClick} />
                }
            </div>
        </div>
    </Fragment>
   )
}

const LoadFriends = ({friends, selectFriend, uid, selectedFriend}) => {
  const addClass = (friend) => {
    if(friend.pending) {
      let flg = friend.pending.filter(item => item.receiver === uid);
      if(flg.length) {
        return flg[0].totalUnseen;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return friends.map((friend, index) => 
        {
          let pending =  addClass(friend);
          console.log(pending);
          return(
          <li key={index}>
            <div style={selectedFriend.uid === friend.uid ? {background: '#b1b1b1'} : {}} key={index} onClick = {() => selectFriend(friend)}>
                {pending && <span className="pending-message">{pending}</span>}
                <span className="icon"><img className="icon" src="https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg" alt="" /></span>
                <span className="title">{friend.firstName + " " + friend.lastName}</span>
                {/* <span>{friend.isActive ? 'Active' : 'offline'}</span> */}
            </div>
          </li>
          );
        }
  )
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
          <span className="send-icon" onClick={sendMessage}><i className="fas fa-paper-plane"></i></span>
      </div>
      {emojiPickerClick && <Picker onEmojiClick={onEmojiClick} />}
    </div>
  </Fragment>
}
export default Chat;