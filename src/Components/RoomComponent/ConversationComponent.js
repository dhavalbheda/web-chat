import React, { Fragment } from 'react';

const ConversationComponent = ({conversation, selectedRoom, user}) => {
   sortCoversation(conversation)

  return conversation.map((item, key) => {
       
    // Date Time
    let createdAt = undefined;
    if(item.createdAt != null) {
      let options = { day: 'numeric', month: 'short'};
      createdAt = new Date(item.createdAt).toLocaleString('en', options);
      createdAt += " " + new Date(item.createdAt).toLocaleTimeString([], {timeStyle: 'short'});
    }

    return (item.roomid === selectedRoom.uid)
    ? <Fragment key={key}>
        <div style={{ textAlign: item.sender === user.uid ? 'right' : 'left'}}>
            <p className={item.sender === user.uid ? 'messageStyle right-message' : 'messageStyle left-message'}>
              <span className="message-time">{item.name}</span>
              <br/>{item.message}<br/>
              <span className="message-time">{ createdAt ? createdAt : '' }</span>
            </p>
        </div>
      </Fragment>
    : <Fragment key={key}></Fragment>
  })
}

const sortCoversation = (data) => {
  data.sort((a, b) => a.createdAt - b.createdAt);
}

export default ConversationComponent;  