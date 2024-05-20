// Importing necessary modules from the 'react' library
import React from 'react';
import { Link } from 'react-router-dom'; // Importing the 'Link' component from 'react-router-dom'
import './CatCard.scss'; // Importing the styles defined in the 'CatCard.scss' file

// Functional component 'CatCard' that takes a 'card' prop
function CatCard({ card }) {
  return (
    // Using the 'Link' component from 'react-router-dom' to create a link to "/gigs?cat=design"
    <Link to='/gigs?cat=design'>
      {/* Container div with the class 'catCard' for styling */}
      <div className='catCard'>
        {/* Image element displaying the image from the 'card' prop */}
        <img src={card.img} alt='' />
        {/* Span element displaying the description from the 'card' prop */}
        <span className='desc'>{card.desc}</span>
        {/* Span element displaying the title from the 'card' prop */}
        <span className='title'>{card.title}</span>
      </div>
    </Link>
  );
}

// Exporting the 'CatCard' component as the default export of this module
export default CatCard;
