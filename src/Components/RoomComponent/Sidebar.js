import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import brandIcon from '../Utils/images/brand.png' ;
import userIcon from '../Utils/images/user-icon.png';

const Sidebar = ({uid, rooms, selectRoom, selectedRoom}) => {
    
    // Bar Click Listener
    const barClick = () => {
        const bar = document.getElementsByClassName('navigation')[0];
        if(bar.offsetWidth < 300) {
            bar.style.width = "300px";
            document.getElementsByClassName('bar-area')[0].style.width = "300px";
        } else {
            bar.style.width = "55px";
            document.getElementsByClassName('bar-area')[0].style.width = "55px";
        }
    }

    return <Fragment>
        <div className="navigation">
            <div className="bar-area">
                <div className="brand-panel" onClick={barClick}>
                    <img className="brand-icon" alt="" src={brandIcon} />
                </div>
                <Link to='/' className="selected-option">
                    <div className="chat-option" style={{borderBottom:'2px solid green', borderTop: '8px solid green'}}>
                    <span className="icon icon-private"><i class="fas fa-user"></i></span>
                    <span className="title title-private">Private</span>
                    </div>
                </Link>
                <div className="chat-option" style={{borderBottom:'8px solid green', background: '#00800036'}}>
                  <span className="icon"><i class="fas fa-users"></i></span>
                  <span className="title">Group</span>
                </div>
            </div>
            <ul>
                {rooms.length > 0 && <LoadRooms
                                            uid={uid}
                                            selectRoom={selectRoom}
                                            rooms={rooms}
                                            selectedRoom={selectedRoom}
                                             />}
            </ul>
        </div>
    </Fragment>
}

const LoadRooms = ({rooms, selectedRoom, selectRoom }) => {

    return rooms.map((room, index) => 
          {
            return(
            <li key={index}>
               <div style={selectedRoom.uid === room.uid ? {background: '#0a762233'} : {}} key={index} onClick = {() => selectRoom(room)}>
                  {/* {pending && <span className="pending-message">{pending}</span>} */}
                  <span><img className="icon" src={userIcon} alt="" /></span>
                  <span className="title">{room.name}</span>
              </div>
            </li>
            );
          }
    )
  }

export default Sidebar;