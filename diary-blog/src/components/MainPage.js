
import React from 'react';
import RecentPosts from './RecentPosts';
import Sidebar from './Sidebar';
import Navbar from './Navbar'

const MainPage = () => {
  return (
    <div>
      <Navbar/>
      <RecentPosts />
      <Sidebar />
    </div>
  );
};

export default MainPage;