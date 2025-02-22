import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './components/login.tsx';
import { Home } from './components/home.tsx';
import { ForgotPassword, Registration } from './components/registration.tsx';
import { useDispatch } from 'react-redux';
import jwb from 'jsonwebtoken';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
      // console.log(document.cookie.split('=')[0] === 'session_token' && document.cookie.split('=')[1] !== '', jwb.decode(document.cookie.split('=')[1]))
      
  // if  (document.cookie.split('=')[0] === 'session_token' && document.cookie.split('=')[1] !== '') {
  //   dispatch(updateLogged({logged: true}));
    // if(window.location.href.includes('login') || window.location.href.includes('registration')){
    //   window.location.assign('../')
    // }
    console.log('else working')
  // } else {
  //   dispatch(updateLogged({logged: false}));
  // }
  }, [])
  return (
    <>
      <Router basename='Note-App'>
        <Routes>
          <Route path='/' Component={Home} />

          <Route path='/login' Component={Login} />
          <Route path='/registration' Component={Registration}  />
          <Route path='/forgot_password' Component={ForgotPassword}  />
        </Routes>
        {/* <Route path='/' component={}  />
        <Route path='/' component={}  /> */}
      </Router>
    </>
  );
}

export default App;
