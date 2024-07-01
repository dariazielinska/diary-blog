import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Auth from './components/Auth';
import MainPage from './components/MainPage';
import AddPost from './components/AddPost';
import { auth } from './firebaseConfig';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <MainPage recentPosts={recentPosts} setRecentPosts={setRecentPosts} /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/addPost" element={<AddPost />} />
      </Routes>
    </Router>
  );
}

export default App;
