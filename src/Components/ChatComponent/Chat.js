import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getAllFriends, getConversation, removeLister, saveMessage } from '../../Redux/Chat/ChatActions';
import Header from '../Header/Header'
import './style.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import 'emoji-picker-element';

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
    setStartChat(true);
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
  return(
        <Fragment>
          <Header/>
          <section className="container-body">
            <div className="listOfUsers">
              {friends.length > 0 && <LoadFriends uid={user.uid} selectFriend={selectFriend} friends={friends} />}
            </div>
            <div className="chatArea">
                <div className="chatHeader"> 
                  {startChat && selectedFriend.firstName + " " + selectedFriend.lastName}
                </div>
                <ScrollToBottom className="messageSections">
                    {
                      startChat && <ChatComponent conversation = {conversation} selectedFriend = {selectedFriend} user = {user}  />
                    }
                </ScrollToBottom>
                <div className="chatControls">
                  {
                    startChat && <Fragment>
                      <div style={{display: 'flex'}}>
                        <textarea
                            placeholder = 'Enter Text...'
                            value = {text}
                            onChange = {e => setText(e.target.value)}></textarea>
                        <button onClick={sendMessage}>Send</button><br/>
                      </div>
                      <div>
                        <emoji-picker></emoji-picker>
                      </div>
                    </Fragment>
                  }
                    
                </div>
              </div>
          </section>
        </Fragment>
   )
}

const LoadFriends = ({friends, selectFriend, uid}) => {
  const addClass = (friend, uid) => {
    if(friend.pendding) {
      
      if(friend.pendding.includes(uid)) {
        console.log("take this to top");
        return 'displayPic pending'
      } else {
        return 'displayPic'
      }
    } else {
      return 'displayPic'
    }
  }

  return friends.map((friend, index) => 
    <div key={index} className="displayName" onClick = {() => selectFriend(friend)}>
      <div className={addClass(friend, uid)}>
          <img src="https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg" alt="" />
      </div>
      <div style={{display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
          <span style={{fontWeight: 500}}>{friend.firstName + " " + friend.lastName}</span>
          <span>{friend.isActive ? 'Active' : 'offline'}</span>
          <span></span>
      </div>
    </div>
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
    ? <div key={key} style={{ textAlign: item.sender === user.uid ? 'right' : 'left'}}>
            <p className={item.sender === user.uid ? 'messageStyle right-message' : 'messageStyle left-message'} >{item.message}<br/>
              <span className="message-time">{ createdAt? createdAt : '' }</span>
              {item.receiver !== user.uid && <span className="message-status">{item.isSeen ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>}</span>}
            </p>
      </div>
    : <Fragment key={key}></Fragment>
  })
}


export default Chat;
