import React, { useState, useEffect } from 'react';
import './style.css';
import HomePage from './HomePage';

export default function CheckLogin() {
  
  useEffect(()=>{

    if(localStorage.getItem('login'))
    {
      setIsLogin(true)
    }

  },[])
  const [isLogin, setIsLogin] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [usrInfo, setUsrInfo] = useState({
    username: '',
    password: '',
  });
  const [showError, setShowError] = useState('');

  let ExistingUsers = [
    {
      username: 'Samcyril',
      password: 'Samcyril@21',
    },
    {
      username: 'Fede',
      password: 'Fede@15',
    },
    {
      username: 'Vini',
      password: 'Vini@7',
    },
    {
      username: 'Jude',
      password: 'Jude@5',
    },
    {
      username:"justin",
      password:"Justin8"
    }
  ];

  const collectInputs = (e) => {
    let key = e.target.name;
    setUsrInfo({ ...usrInfo, [key]: e.target.value });
  };

  const check = (e) => {
    e.preventDefault();
    if(usrInfo.username.length > 0 && usrInfo.password.length > 0)
    {
    let isPresent = ExistingUsers.findIndex((obj) => {
      return obj['username'] == usrInfo.username;
    });

    if (isPresent == -1) {
      setShowError(`Invalid User, Or user doesn't exist`);
    } else if (
      ExistingUsers[isPresent].username == usrInfo.username &&
      ExistingUsers[isPresent].password == usrInfo.password
    ) {
      setShowError('');
      localStorage.setItem('login', true)
      setIsLogin(true);
    } else {
      setShowError('Invalid Password');
    }
  }
  else{
    setShowError('Enter Details!');
  }
  };


  const switchHideShow = () => {
    setShowpass(!showpass);
  };

  const loginform = () => {
    return (
      <div id="formContainer">
      <form onSubmit={check} id="form">
        <h1>Enter User Credentials</h1>
        <input
          placeholder="User Name"
          type="text"
          value={usrInfo.username}
          name="username"
          onChange={collectInputs}
        />
        <br/>
        <input
          placeholder="Password"
          type={showpass ? 'text' : 'password'}
          id="pwd"
          value={usrInfo.password}
          name="password"
          onChange={collectInputs}
        />
        <input type="checkbox" onChange={switchHideShow} />
        <p>{showError}</p>
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  };

  return <>{isLogin ? <HomePage /> : loginform()}</>;
}
