import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div style={{display:"flex"}}>
      <div style={{width:"50%", height:"100vh", backgroundColor:"#a4c4b5"}}>

      </div>
      <div style={{width:"50%", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"#fff"}}>
        <div style={{width:"400px", height:"200px", border:"1px solid red"}}>
          <div style={{width:"80%", margin:"0 auto", padding: "30px 0"}}>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              style={{width:"100%", height:"30px"}}
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              style={{width:"100%", height:"30px", marginTop:"20px"}}
            />
          </div>
          <div style={{width:"80%", margin:"0 auto", display:"flex", justifyContent:"space-between"}}>
            <button 
              onClick={handleSignUp}
              style={{width:"40%", height:"30px"}}
            > 
              Sign Up
            </button>
            <button 
              onClick={handleSignIn}
              style={{width:"40%", height:"30px"}}
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
