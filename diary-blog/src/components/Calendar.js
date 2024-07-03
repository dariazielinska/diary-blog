import React, { useState, useEffect } from 'react';
import { collection, getDocs, where, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

const Calendar = ({ setRecentPosts }) => {
  const [daysWithPosts, setDaysWithPosts] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchDaysWithPosts = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('Użytkownik niezalogowany!');
          return;
        }

        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        const q = query(
          collection(db, 'posts'),
          where('author', '==', user.uid),
          where('createdAt', '>=', firstDayOfMonth),
          where('createdAt', '<=', lastDayOfMonth),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const days = new Set();
        querySnapshot.forEach((doc) => {
          const timestamp = doc.data().createdAt.toDate();
          days.add(timestamp.getDate());
        });
        setDaysWithPosts(Array.from(days));
      } catch (error) {
        console.error('Error fetching days with posts:', error);
      }
    };

    fetchDaysWithPosts();
  }, [currentMonth]);

  const handleDayClick = async (day) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('Użytkownik niezalogowany!');
        return;
      }

      const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);

      const q = query(
        collection(db, 'posts'),
        where('author', '==', user.uid),
        where('createdAt', '>=', selectedDate),
        where('createdAt', '<', nextDay),
        orderBy('createdAt', 'asc')
      );

      const querySnapshot = await getDocs(q);
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setRecentPosts(postsData);
    } catch (error) {
      console.error(`Error fetching posts`, error);
    }
  };

  const renderDays = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const hasPosts = daysWithPosts.includes(day);
      days.push(
        <button
          key={day}
          onClick={() => {
            if (hasPosts) handleDayClick(day);
          }}
          style={{ 
            cursor: "pointer", 
            border:"none", 
            backgroundColor:"#fff", 
            fontWeight: hasPosts ? 'bold' : 'normal',
            width: '15px',
            textAlign: 'center',
            margin: '0 5px 5px 0'
          }}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  return (
    <div>
      <h2 style={{fontSize:"20px", borderBottom:"4px solid #A4C4B5", width:"90%"}}>Kalendarz</h2>
      <div style={{display:"flex", justifyContent:"space-between", width:"150px", marginBottom: "10px"}}>
        <button style={{ cursor: "pointer", border:"none", backgroundColor:"#fff"}} onClick={handlePrevMonth}>{'<'}</button>
        <span style={{fontSize:"13px"}}>{`${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}</span>
        <button style={{ cursor: "pointer", border:"none", backgroundColor:"#fff"}} onClick={handleNextMonth}>{'>'}</button>
      </div>
      <div style={{width: "150px"}}>{renderDays()}</div>
    </div>
  );
};

export default Calendar;
