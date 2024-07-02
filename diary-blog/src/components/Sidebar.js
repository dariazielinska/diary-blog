import React from 'react';
import Archive from './Archieve';
import Calendar from './Calendar'

const Sidebar = ({ setRecentPosts }) => {

  const divStyle = { 
    position: "fixed", 
    right: "15px", 
    width: '18%', 
    display:'flex', 
    flexDirection:'column', 
    marginTop: "50px" 
  }

  const smallerDivStyle = { 
    width: '80%', 
    display:'flex', 
    flexDirection:'column', 
    justifyContent: 'center',
    marginTop: "50px" 
  }

  return (
    <div style={window.innerWidth <= 460 ? smallerDivStyle : divStyle}>
      <Archive setRecentPosts={setRecentPosts} />
      <Calendar setRecentPosts={setRecentPosts} />
    </div>
  );
};

export default Sidebar;