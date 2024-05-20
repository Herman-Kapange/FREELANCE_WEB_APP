// Importing necessary modules from the 'react' library and the 'react-router-dom' library
import React, { useState } from 'react';
import './Featured.scss'; // Importing styles from the 'Featured.scss' file
import { useNavigate } from 'react-router-dom';

// Functional component 'Featured'
function Featured() {
  // State variable for the input value and a function to update it
  const [input, setInput] = useState('');

  // 'useNavigate' hook from 'react-router-dom' for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission and navigate to the search page
  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  // Rendering the featured section with an image, title, and search input
  return (
    <div className='featured'>
      <div className='container'>
        <div className='left'>
          {/* Image on the left side */}
          <img src='./img/man.png' alt='' />
        </div>
        <div className='right'>
          {/* Title on the right side */}
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          {/* Search input and button */}
          <div className='search'>
            <div className='searchInput'>
              {/* Search icon */}
              <img src='./img/search.png' alt='' />
              {/* Input for search with onChange event to update the state */}
              <input
                type='text'
                placeholder='Try "website developers"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {/* Button to trigger the search */}
            <button onClick={handleSubmit}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting the 'Featured' component as the default export of this module
export default Featured;
