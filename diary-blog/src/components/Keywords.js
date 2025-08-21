import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, where, limit } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const Keywords = ({ setRecentPosts }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
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
          limit(1000)
        );

        const querySnapshot = await getDocs(q);
        let allTags = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.keywords && Array.isArray(data.keywords)) {
            allTags = [...allTags, ...data.keywords];
          }
        });

        const uniqueSortedTags = [...new Set(allTags)].sort((a, b) =>
          a.localeCompare(b, 'pl', { sensitivity: 'base' })
        );
        setTags(uniqueSortedTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleTagClick = async (tag) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('Użytkownik niezalogowany!');
        return;
      }

      const q = query(
        collection(db, 'posts'),
        where('author', '==', user.uid),
        where('keywords', 'array-contains', tag),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setRecentPosts(postsData);
    } catch (error) {
      console.error(`Error fetching posts for tag "${tag}":`, error);
    }
  };

  return (
    <div style={{ width: '100%', marginRight: '20px' }}>
      <h2 style={{ fontSize: "20px", borderBottom: "4px solid #A4C4B5", width: "90%" }}>Tagi</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              style={{
                cursor: "pointer",
                border: "none",
                backgroundColor: "#f0f0f0",
                borderRadius: "15px",
                padding: "5px 10px",
                fontSize: "13px",
              }}
            >
              {tag}
            </button>
          ))
        ) : (
          <p style={{ color: "#999" }}>Brak tagów</p>
        )}
      </div>
    </div>
  );
};

export default Keywords;
