import React from 'react';
import Archive from './Archieve';

const Sidebar = ({ setRecentPosts }) => {
  return (
    <div style={{ width: '15%', float: 'left' }}>
      <Archive setRecentPosts={setRecentPosts} />
    </div>
  );
};

export default Sidebar;