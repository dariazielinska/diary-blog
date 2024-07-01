import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import { auth } from '../firebaseConfig';

const AddPost = () => {
  const [postContent, setPostContent] = useState('');
  const navigate = useNavigate();

  const handleAddPost = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('Użytkownik niezalogowany!');
        return;
      }

      const docRef = await addDoc(collection(db, 'posts'), {
        content: postContent,
        author: user.uid, 
        createdAt: new Date(),
      });
      console.log('Dodano nowy post z ID:', docRef.id);
      
      navigate('/');
    } catch (error) {
      console.error('Błąd dodawania posta:', error.message);
    }
  };

  return (
    <>
      <Navbar appName="Diary Blog" />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Wprowadź treść posta..."
            style={{ width: '100%', minHeight: '200px', padding: '10px' }}
          />
          <br />
          <button onClick={handleAddPost} style={{ marginTop: '10px' }}>Dodaj nowy post</button>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default AddPost;
