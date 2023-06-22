import React,{useState,useContext,useRef} from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore/lite';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const navigate=useNavigate()
  const[username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const[email,setEmail]=useState('')
  const[phone,setPhone]=useState('')
  const[error,setError]=useState(null)

  const usernameRef=useRef(null)
  const emailRef=useRef(null)
  const passwordRef=useRef(null)
  const phoneRef=useRef(null)
  const { firebaseApp,firestore}=useContext(FirebaseContext)

const handleSubmit=(e)=>{
  e.preventDefault()

    setEmail(emailRef.current.value)
    setPassword(passwordRef.current.value)
    setPhone(phoneRef.current.value)
    setUsername(usernameRef.current.value)

    const auth=getAuth(firebaseApp)
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((userCredential)=>{
      const user=userCredential.user;

      updateProfile(user,{
        displayName:username
      })
      .then(()=>{
        addDoc(collection(firestore,"user"),{
          id:userCredential.user.uid,
          email,
          password,
          phone,
          username
        })
        .then(()=>{
         navigate('/login')
        })
        .catch((err)=>{
          console.log(err.code);
          console.log(err.message);
        })
      })
      .catch((err)=>{
        console.log(err.code);
        console.log(err.message);
      })

    }) .catch((err)=>{
      console.log(err.code);
      console.log(err.message);
      setError(err.message)
    })



}
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            ref={usernameRef}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            ref={emailRef}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            ref={phoneRef}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
         
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            ref={passwordRef}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{navigate('/login')}}>Login</a>
      </div>
    </div>
  );
}
