import React, { useContext, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import "../style/LogIn.css"
import { AuthContext } from '../context/AuthContext';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setJwt } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setErrorMessage('Password or username is incorrect.');
      return;
    }

    await axios.post('http://localhost:5000/login', {
      username,
      password,
    })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);

          setJwt(response.data.accessToken)
          setIsLoggedIn(true); // Benutzer ist eingeloggt

          setErrorMessage('user logged in ' + response.status);
          window.location.href = '/';
        }

        if (response.status === 400) {
          setIsLoggedIn(false); // Fehler oder Logout
          setErrorMessage('Incorrect username or password');
          // setJwt(" ")
        }
      })
      .catch(error => {
        // Here you could check for the specific error message and set it
        if (error.response.status === 400) {
          setErrorMessage('Incorrect username or password');
        } else {
          setErrorMessage('An unexpected error occurred');
        }
      });
  };
  return (
    <div className="logIn">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="loginbox">
        <div className="pic">
          <i className="fas fa-user"></i>
        </div>
        <h1>Login here</h1>
        <form onSubmit={handleSubmit}>
          <p className='loginbox__p'>Username</p>
          <input className='loginbox__input' type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
          <p className='loginbox__p'>Password</p>
          <input className='loginbox__input' type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
          <div>
            <input className='loginbox__input' type="submit" value="LogIn" />
            {/*  <input
              className='loginbox__input'
              type="submit"
              value={isLoggedIn ? 'Log Out' : 'Log In'}
              
              onClick={() => {
                if (isLoggedIn) {
                  localStorage.setItem('accessToken', ' ');
                  setJwt()
                  setIsLoggedIn(false);
                }
              }}
            /> */}

          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <br></br>
          {/* <a className='loginbox__a' href="register.html">Register here</a> */}

        </form>
        {/* <button
          className="nav-btn login"
          onClick={() => {
            
              localStorage.setItem('accessToken', ' ');
              setJwt('')
              // Hier können Sie den Logout-Vorgang durchführen oder den Zustand in der übergeordneten Komponente aktualisieren
            
          }}
        >
          LogOut
        </button> */}
      </div>
    </div>
  )
}

export default LogIn