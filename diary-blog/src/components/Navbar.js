import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Navbar = ({ fetchPosts }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <nav style={{ backgroundColor: '#333', color: '#fff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 onClick={fetchPosts} style={{ cursor: 'pointer' }}>Diary Blog</h1>
      <div>
        <Link to="/addPost" style={{ color: '#fff', marginRight: '10px' }}>Dodaj</Link>
        <button onClick={handleSignOut}>Wyloguj</button>
      </div>
    </nav>
  );
};

export default Navbar;
