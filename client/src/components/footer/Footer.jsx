// Importing necessary modules from the 'react' library
import React from 'react';
import './Footer.scss'; // Importing styles from the 'Footer.scss' file

// Functional component 'Footer'
function Footer() {
  // Rendering the footer section with categories, about, support, and other information
  return (
    <div className='footer'>
      <div className='container'>
        {/* Top section with categories, about, and support */}
        <div className='top'>
          {/* Categories section */}
          <div className='item'>
            <h2>Categories</h2>
            {/* List of categories */}
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
          </div>
          {/* About section */}
          <div className='item'>
            <h2>About</h2>
            {/* List of about-related information */}
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          {/* Support section */}
          <div className='item'>
            <h2>Support</h2>
            {/* List of support-related information */}
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on WorkWyzeZM</span>
            <span>Buying on WorkWyzeZM</span>
          </div>
        </div>
        {/* Horizontal line separating top and bottom sections */}
        <hr />
        {/* Bottom section with company information, social links, language, and accessibility */}
        <div className='bottom'>
          {/* Left side with company information */}
          <div className='left'>
            <h2>WorkWyzeZM</h2>
            <span>© WorkWyzeZM. 2023</span>
          </div>
          {/* Right side with social links, language, and accessibility */}
          <div className='right'>
            {/* Social links */}
            <div className='social'>
              <img src='/img/twitter.png' alt='' />
              <img src='/img/facebook.png' alt='' />
              <img src='/img/linkedin.png' alt='' />
              <img src='/img/pinterest.png' alt='' />
              <img src='/img/instagram.png' alt='' />
            </div>
            {/* Language information */}
            <div className='link'>
              <img src='/img/language.png' alt='' />
              <span>English</span>
            </div>
            {/* Accessibility icon */}
            <img src='/img/accessibility.png' alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting the 'Footer' component as the default export of this module
export default Footer;
