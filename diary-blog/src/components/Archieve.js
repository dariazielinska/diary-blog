import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

const Archive = ({ setRecentPosts }) => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchMonths = async () => {
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
          const timestamp = doc.data().createdAt.toDate();
          const monthYear = `${timestamp.getMonth() + 1}/${timestamp.getFullYear()}`;
          if (!postsData.includes(monthYear)) {
            postsData.push(monthYear);
          }
        });
        setMonths(postsData);
      } catch (error) {
        console.error('Error fetching months:', error);
      }
    };

    fetchMonths();
  }, []);

  const handleMonthClick = async (monthYear) => {
    try {
      const [month, year] = monthYear.split('/');
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);
      const user = auth.currentUser;
      if (!user) {
        console.error('Użytkownik niezalogowany!');
        return;
      }
      
      const q = query(
        collection(db, 'posts'),
        where('author', '==', user.uid),
        where('createdAt', '>=', firstDayOfMonth),
        where('createdAt', '<=', lastDayOfMonth),
        orderBy('createdAt', 'desc'),
        limit(20)
      );

      const querySnapshot = await getDocs(q);
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      console.log("POST ", postsData)
      setRecentPosts(postsData);
    } catch (error) {
      console.error(`Error fetching posts for ${monthYear}:`, error);
    }
  };

  return (
    <div style={{ width: '15%', float: 'right', marginRight: '20px' }}>
      <h2>Archive</h2>
      {months.map((month, index) => (
        <button key={index} onClick={() => handleMonthClick(month)}>
          {month}
        </button>
      ))}
    </div>
  );
};

export default Archive;
