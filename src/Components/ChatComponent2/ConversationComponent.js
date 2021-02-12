import React from 'react';

const ConversationComponent = ({conversation, selectedFriend, user}) => {
  
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
export default ConversationComponent;  