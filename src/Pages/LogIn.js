import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import "../style/LogIn.css"

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await axios.post('http://localhost:5000/login', {
        username,
        password,
      })
        .then(response => {
            if(response.status === 200){
                localStorage.setItem('accessToken', response.data.accessToken);
                setErrorMessage('user logged in ' + response.status);
                window.location.href = '/';
            }
          
          if (response.status === 400) {
            setErrorMessage('Incorrect username or password');
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
    <div class="logIn">
    <Navbar />
    <div className="loginbox">
    <div class="pic">
		<i class="fas fa-user"></i>
	</div>
      <h1>Login here</h1>
      <form onSubmit={handleSubmit}>
        <p className='loginbox__p'>Username</p>
        <input className='loginbox__input' type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
        <p className='loginbox__p'>Password</p>
        <input className='loginbox__input' type="password"  placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
        <div>
        <input className='loginbox__input' type="submit" value="LogIn" />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <br></br>
        {/* <a className='loginbox__a' href="register.html">Register here</a> */}
      </form>
    </div>
    </div>
  )
}

export default LogIn
