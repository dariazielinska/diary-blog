import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import RecentPosts from './RecentPosts';
import { collection, getDocs, where, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

const MainPage = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('Użytkownik niezalogowany!');
          return;
        }

        const q = query(
          collection(db, 'posts'),
          where('author', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(20)
        );
        const querySnapshot = await getDocs(q);
        const postsData = [];
        querySnapshot.forEach((doc) => {
          postsData.push({ id: doc.id, ...doc.data() });
        });
        setRecentPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <RecentPosts recentPosts={recentPosts} />
      <Sidebar setRecentPosts={setRecentPosts} />
    </div>
  );
};

export default MainPage;
