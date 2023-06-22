import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Create from './pages/Create'
import ViewPost from './pages/ViewPost'
import {AuthContext} from './store/Context';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Post from './store/PostContext';

function App() {
  const{user,setUser}=useContext(AuthContext)
  useEffect(()=>{
   const auth=getAuth()
   onAuthStateChanged(auth,(user)=>{
    if(user){
      const uid=user.uid
      setUser(user)
    }else{
      //user is signed out
    }
   })
  })
  return (
    <div className="App">
      <Post>
      <Router>
        <Routes>
        <Route  path='/' element={ <Home />}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Create' element={<Create/>}/>
        <Route path='/view' element={<ViewPost/>}/>
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
