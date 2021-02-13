import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

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
                <span className="icon bar-icon" onClick={barClick}><i className="fas fa-bars"></i></span>
                <div className="chat-panel">
                    <span>Group</span>
                    <span><Link to='/private'>Private</Link></span>
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
               <div style={selectedRoom.uid === room.uid ? {background: '#f1f8eb'} : {}} key={index} onClick = {() => selectRoom(room)}>
                  {/* {pending && <span className="pending-message">{pending}</span>} */}
                  <span className="icon"><img className="icon" src="https://i.pinimg.com/originals/86/63/78/866378ef5afbe8121b2bcd57aa4fb061.jpg" alt="" /></span>
                  <span className="title">{room.name}</span>
              </div>
            </li>
            );
          }
    )
  }

export default Sidebar;