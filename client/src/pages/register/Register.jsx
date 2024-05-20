// Importing necessary dependencies and styles
import React, { useState } from 'react';
import upload from '../../utils/upload';
import './Register.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

// Functional component 'Register'
function Register() {
  // State for file input and user information
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
  });

  // React Router's navigation hook
  const navigate = useNavigate();

  // Handler to update the user state on input change
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Handler to toggle the 'isSeller' property in the user state
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  // Handler to submit the registration form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Uploading the profile picture and getting the URL
    const url = await upload(file);

    try {
      // Sending registration request to the server
      await newRequest.post('/auth/register', {
        ...user,
        img: url,
      });
      // Navigating to the home page after successful registration
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  // Rendering the 'Register' component
  return (
    <div className='register'>
      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        {/* Left section of the form */}
        <div className='left'>
          <h1>Create a new account</h1>
          {/* Input fields for username, email, password, profile picture, and country */}
          <label htmlFor=''>Username</label>
          <input
            name='username'
            type='text'
            placeholder='johndoe'
            onChange={handleChange}
          />
          <label htmlFor=''>Email</label>
          <input
            name='email'
            type='email'
            placeholder='email'
            onChange={handleChange}
          />
          <label htmlFor=''>Password</label>
          <input name='password' type='password' onChange={handleChange} />
          <label htmlFor=''>Profile Picture</label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor=''>Country</label>
          <input
            name='country'
            type='text'
            placeholder='USA'
            onChange={handleChange}
          />
          {/* Submit button */}
          <button type='submit'>Register</button>
        </div>
        {/* Right section of the form (for becoming a seller) */}
        <div className='right'>
          <h1>I want to become a seller</h1>
          {/* Toggle switch for activating the seller account */}
          <div className='toggle'>
            <label htmlFor=''>Activate the seller account</label>
            <label className='switch'>
              <input type='checkbox' onChange={handleSeller} />
              <span className='slider round'></span>
            </label>
          </div>
          {/* Input fields for phone number and description */}
          <label htmlFor=''>Phone Number</label>
          <input
            name='phone'
            type='text'
            placeholder='+1 234 567 89'
            onChange={handleChange}
          />
          <label htmlFor=''>Description</label>
          <textarea
            placeholder='A short description of yourself'
            name='desc'
            id=''
            cols='30'
            rows='10'
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

// Exporting the 'Register' component as the default export of this module
export default Register;
