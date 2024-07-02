import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import AuthImg from '../../src/assets/AuthImg.png'
import MyBestDiary from '../../src/assets/MyBestDiary.png'

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const inputStyle = {
    width: '100%',
    height: '30px',
    marginTop: '20px',
    border: 'none',
    borderBottom: '1px solid #696969',
    outline: 'none'
  };

  const buttonStyle = {
    width: '45%',
    height: '30px',
    border: '1px solid #696969',
    backgroundColor: "#696969",
    borderRadius: "20px",
    color: "#ffffff",
    marginTop:"50px",
    cursor: "pointer"
  };

  const smallerScreenStyles = {
    div: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      aligntems: 'center'
    },
    section: { 
      display: 'none'
    },
    h2: {
      fontSize: '12px',
      margin: '5px'
    },
    h3: {
      fontSize: '9px',
      margin: '5px'
    }
  };

  return (
    <div style={window.innerWidth <= 450 ? smallerScreenStyles.div : {display:"flex"}}>
      <div style={window.innerWidth <= 450 ? smallerScreenStyles.section : {width:"50%", height:"100vh", backgroundColor:"#a4c4b5", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", color: "#F8F4F2"}}>
        <img src={AuthImg} alt="Description" style={{ maxWidth: '45%', marginBottom:"20px" }} />
        <h2 style={window.innerWidth <= 860 ? smallerScreenStyles.h2 : {margin: "5px"}}>Wspomnienia, które zostaną na lata</h2>
        <h3 style={window.innerWidth <= 860 ? smallerScreenStyles.h3 : {margin: "5px"}}>Proste, bezpiecznie i tylko Twoje</h3>
        <p style={{fontSize:"10px", width:"70%", textAlign:"center"}}>Dodawaj nieograniczoną liczbę postów do swojego dziennika. Przelej swoje emocje, wspomnienia i przemyślenia w słowa, wracaj do nich zawsze kiedy chcesz. Przypomnij sobie najdrobniejsze szczegóły, wyciągnij wnioski ze swoich błędów i pozwól odkryć siebie na nowo!</p>
      </div>
      <div style={{width: window.innerWidth <= 450 ? "100%" : "50%", height:"85vh", display:"flex", justifyContent:"center", alignItems: "center", backgroundColor:"#fff"}}>
          <div style={{display:"flex", flexDirection:"column"}}>
            <img src={MyBestDiary} alt="Description" style={{ width:"200px", marginBottom: "20px"}} />
            <h1 style={{color:"#B0B0B0", fontSize: "20px", marginBottom: "20px"}}>Witaj w My Best Diary</h1>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              style={inputStyle}
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              style={inputStyle}
            />
            <div style={{display:"flex", justifyContent:"space-between"}}>
            <button 
              onClick={handleSignUp}
              style={buttonStyle}
            > 
              Sign Up
            </button>
            <button 
              onClick={handleSignIn}
              style={buttonStyle}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
