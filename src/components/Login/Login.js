import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword ,getAuth} from 'firebase/auth';

function Login() {
  const navigate=useNavigate()

 const[email,setEmail]=useState('')
 const[password,setPassword]=useState('')
 
 const {firestore,firebaseApp}=useContext(FirebaseContext)

 const handleLogin=(e)=>{
  e.preventDefault();

  const auth=getAuth(firebaseApp)
    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
      navigate('/')
    })
    .catch((error)=>{
      alert(error.message)
    })

  
 }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="fname"
            name="email"
           
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{navigate('/signup')}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
