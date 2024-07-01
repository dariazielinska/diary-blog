import React from 'react';
import Archive from './Archieve';
import Calendar from './Calendar'

const Sidebar = ({ setRecentPosts }) => {
  return (
    <div style={{ width: '15%', float: 'left', display:'flex', flexDirection:'column' }}>
      <Archive setRecentPosts={setRecentPosts} />
      <Calendar setRecentPosts={setRecentPosts} />
    </div>
  );
};

export default Sidebar;