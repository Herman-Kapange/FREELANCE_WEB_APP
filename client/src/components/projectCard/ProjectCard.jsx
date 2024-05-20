// Importing necessary modules from the 'react' library
import React from 'react';
import './ProjectCard.scss'; // Importing styles from the 'ProjectCard.scss' file

// Functional component 'ProjectCard'
function ProjectCard({ card }) {
  // Rendering a project card with image, user profile picture, category, and username
  return (
    <div className='projectCard'>
      {/* Project image */}
      <img src={card.img} alt='' />
      <div className='info'>
        {/* User profile picture */}
        <img src={card.pp} alt='' />
        <div className='texts'>
          {/* Project category */}
          <h2>{card.cat}</h2>
          {/* Username */}
          <span>{card.username}</span>
        </div>
      </div>
    </div>
  );
}

// Exporting the 'ProjectCard' component as the default export of this module
export default ProjectCard;
