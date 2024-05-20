// Importing necessary modules from the 'react' library and 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest'; // Importing a utility function for making API requests
import './Navbar.scss'; // Importing styles from the 'Navbar.scss' file

// Functional component 'Navbar'
function Navbar() {
  // State variables for the navbar's active state and user options dropdown
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  // Extracting the current pathname from the location
  const { pathname } = useLocation();

  // Function to determine if the navbar should be active based on scroll position
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  // Adding event listener for scroll and cleaning up on component unmount
  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    };
  }, []);

  // Retrieving current user information from local storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // 'useNavigate' hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await newRequest.post('/auth/logout');
      localStorage.setItem('currentUser', null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  // Rendering the navbar with logo, links, and optional user options
  return (
    <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className='container'>
        {/* Logo section */}
        <div className='logo'>
          <Link className='link' to='/'>
            <span className='text'>WorkWyzeZM</span>
          </Link>
          <span className='dot'>.</span>
        </div>
        {/* Links section */}
        <div className='links'>
          {/* Static links */}
          <span>WorkWyzeZM Business</span>
          <span>Explore</span>
          {/* Conditionally rendering 'Become a Seller' link */}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {/* Conditionally rendering user options or sign-in/join links */}
          {currentUser ? (
            <div className='user' onClick={() => setOpen(!open)}>
              {/* User avatar and username */}
              <img src={currentUser.img || '/img/noavatar.jpg'} alt='' />
              <span>{currentUser?.username}</span>
              {/* Dropdown with user options */}
              {open && (
                <div className='options'>
                  {currentUser.isSeller && (
                    <>
                      <Link className='link' to='/mygigs'>
                        Gigs
                      </Link>
                      <Link className='link' to='/add'>
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className='link' to='/orders'>
                    Orders
                  </Link>
                  <Link className='link' to='/messages'>
                    Messages
                  </Link>
                  <Link className='link' onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            // Sign-in/join links
            <>
              <Link to='/login' className='link'>
                Sign in
              </Link>
              <Link className='link' to='/register'>
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Additional menu and category links when navbar is active */}
      {(active || pathname !== '/') && (
        <>
          <hr />
          <div className='menu'>
            {/* Example category links (modify as needed) */}
            <Link className='link menuLink' to='/'>
              Graphics & Design
            </Link>
            <Link className='link menuLink' to='/'>
              Video & Animation
            </Link>
            <Link className='link menuLink' to='/'>
              Writing & Translation
            </Link>
            <Link className='link menuLink' to='/'>
              AI Services
            </Link>
            <Link className='link menuLink' to='/'>
              Digital Marketing
            </Link>
            <Link className='link menuLink' to='/'>
              Music & Audio
            </Link>
            <Link className='link menuLink' to='/'>
              Programming & Tech
            </Link>
            <Link className='link menuLink' to='/'>
              Business
            </Link>
            <Link className='link menuLink' to='/'>
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

// Exporting the 'Navbar' component as the default export of this module
export default Navbar;
