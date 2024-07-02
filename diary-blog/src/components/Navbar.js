import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Navbar = ({ fetchPosts }) => {

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const buttonStyle = {
    width: '100px',
    height: '30px',
    border: '1px solid #696969',
    backgroundColor: "#696969",
    borderRadius: "20px",
    color: "#ffffff",
    cursor: "pointer", 
    textDecoration: "none",
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '15px'
  };

  return (
    <nav style={{ width:"100%", position: "fixed", backgroundColor: '#A4C4B5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" onClick={fetchPosts} style={{ cursor: 'pointer', flex: '0 0 auto' }}>
        <img src={'/MyBestDiaryGreen.png'} alt="Diary Blog" style={{ maxWidth: '40%', height: 'auto', marginLeft: "40px" }} />
      </Link>
      <div style={{ display: 'flex', gap: '10px', marginRight:"45px" }}>
        <Link to="/addPost" style={buttonStyle}> Dodaj post </Link>
        <Link to="/auth" onClick={handleSignOut} style={buttonStyle}> Wyloguj </Link>
      </div>
    </nav>
  );
};

export default Navbar;
