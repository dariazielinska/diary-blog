import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');
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
        keywords: keywords
          .split(',')
          .map(k => k.trim())
          .filter(k => k.length > 0),
      });
      setTitle('');
      setContent('');
      setKeywords('');
      navigate('/');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const buttonStyle = {
    width: '200px',
    height: '30px',
    border: '1px solid #696969',
    backgroundColor: "#696969",
    borderRadius: "8px",
    color: "#ffffff",
    cursor: "pointer", 
    textDecoration: "none",
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '15px'
  };

  return (
    <>
      <Navbar appName="Diary Blog" />
      <div style={{display:"flex"}}>
        <div style={{ width: '73%', margin: "25px 45px", paddingTop:"50px" }}>
          <form onSubmit={handleAddPost}>
            <div>
              <label htmlFor="title"></label>
              <input
                placeholder='Tytuł'
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{width:"400px", height:"25px", marginBottom: "20px", outlineColor:"#799186"}}
              />
            </div>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              style={{height:"300px", marginBottom:"20px"}}
            />
            <div style={{marginTop:"50px"}}>
              <input
                placeholder="Słowa kluczowe (oddzielone przecinkami)"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                style={{width:"400px", height:"25px", marginBottom: "10px", outlineColor:"#799186"}}
              />
            </div>

            <button style={buttonStyle} type="submit">Dodaj nowy post</button>
          </form>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default AddPost;
