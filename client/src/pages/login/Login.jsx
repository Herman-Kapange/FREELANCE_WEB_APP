// Importing React, useState, and styles
import React, { useState } from 'react';
import './Login.scss';

// Importing utility function for making HTTP requests
import newRequest from '../../utils/newRequest';

// Importing useNavigate hook for programmatic navigation
import { useNavigate } from 'react-router-dom';

// Functional component 'Login'
function Login() {
  // State for managing username, password, and error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Making a POST request to the login endpoint with provided username and password
      const res = await newRequest.post('/auth/login', { username, password });

      // Storing user data in localStorage upon successful login
      localStorage.setItem('currentUser', JSON.stringify(res.data));

      // Navigating to the home page
      navigate('/');
    } catch (err) {
      // Handling login error and updating the 'error' state
      setError(err.response.data);
    }
  };

  // Rendering the login form
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        {/* Input for entering username */}
        <label htmlFor=''>Username</label>
        <input
          name='username'
          type='text'
          placeholder='johndoe'
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Input for entering password */}
        <label htmlFor=''>Password</label>
        <input
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button to submit the login form */}
        <button type='submit'>Login</button>

        {/* Displaying error message if login fails */}
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
}

// Exporting the 'Login' component as the default export of this module
export default Login;
