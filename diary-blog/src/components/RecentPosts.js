import React, { useState, useEffect } from 'react';
import { collection, getDocs, where, query, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

const RecentPosts = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('Użytkownik niezalogowany!');
          return;
        }
        
        const q = query(collection(db, 'posts'), where('author', '==', user.uid));
        console.log("q", q)
        const querySnapshot = await getDocs(q);
        console.log("querySnapshot", querySnapshot)
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
    <div style={{ width: '85%', float: 'left' }}>
      <h2>Recent Posts</h2>
      {recentPosts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
