import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleAddPost = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.error('Użytkownik niezalogowany!');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        author: user.uid,
        createdAt: Timestamp.now(),
      });
      setTitle('');
      setContent('');
      navigate('/');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <>
      <Navbar appName="Diary Blog" />
      <div style={{ width: '85%', float: 'left' }}>
        <h2>Dodaj nowy post</h2>
        <form onSubmit={handleAddPost}>
          <div>
            <label htmlFor="title">Tytuł</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Treść</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Dodaj nowy post</button>
        </form>
      </div>
      <Sidebar />
    </>
  );
};

export default AddPost;
