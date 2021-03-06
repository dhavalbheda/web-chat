import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ScrollToBottom from 'react-scroll-to-bottom';
import Picker from 'emoji-picker-react';

// User Define
import './../Utils/css/font-awesome.css';
import './style.css';
import Header from '../Header/Header';
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
   console.log(emoji);
  };
  return(
        <Fragment>
          <Header/>
          <section className="container-body">
            <div className="listOfUsers">
              {friends.length > 0 && <LoadFriends uid={user.uid} selectFriend={selectFriend} friends={friends} selectedFriend={selectedFriend} />}
            </div>
            <div className="chatArea">
                <div className="chatHeader"> 
                  {startChat && selectedFriend.firstName + " " + selectedFriend.lastName}
                </div>
                <div className={emojiPickerClick ? "messageSections-collaps" : "messageSections"}>
                    {
                      startChat && <ConversationComponent conversation = {conversation} selectedFriend = {selectedFriend} user = {user}  />
                    }
                </div>
                <div className="chatControls" style={emojiPickerClick ? {height:'45%'} :  {height:'5%'}}>
                  {
                    startChat && <Fragment>
                      <div className="control">
                        <textarea
                            placeholder = 'Enter Text...'
                            value = {text}
                            onChange = {e => {
                                setText(e.target.value)
                            }}
                            ></textarea>
                            <span className="smile-icon" onClick={e => setEmojiPickerClick(!emojiPickerClick)}><i className="far fa-smile"></i></span>
                            <span className="send-button-icon" onClick={sendMessage}><i className="fas fa-paper-plane"></i></span>
                      </div>
                      <div>
                       { <Picker onEmojiClick={onEmojiClick} />}
                      </div>
                    </Fragment>
                  }
                </div>
              </div>
          </section>
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
    <div style={selectedFriend.uid === friend.uid ? {background: '#b1b1b1'} : {}} key={index} className="displayName" onClick = {() => selectFriend(friend)}>
      <div className={addClass(friend, uid)}>
          <img src="https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg" alt="" />
      </div>
      <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
          <span style={{fontWeight: 500}}>{friend.firstName + " " + friend.lastName}</span>
          <span>{friend.isActive ? 'Active' : 'offline'}</span>
      </div>
    </div>
  )
}

export default Chat;
