import React from 'react';
import Archive from './Archieve';
import Calendar from './Calendar'

const Sidebar = ({ setRecentPosts }) => {
  return (
    <div style={{ position: "fixed", right: "15px", width: '18%', display:'flex', flexDirection:'column', marginTop: "50px" }}>
      <Archive setRecentPosts={setRecentPosts} />
      <Calendar setRecentPosts={setRecentPosts} />
    </div>
  );
};

export default Sidebar;