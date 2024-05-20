// Importing necessary modules from 'react' and external libraries
import React from 'react';
import './Slide.scss'; // Importing styles from the 'Slide.scss' file
import Slider from 'infinite-react-carousel'; // Importing the 'Slider' component

// Functional component 'Slide'
const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  // Rendering a slide component with a container and an infinite slider
  return (
    <div className='slide'>
      {/* Container for the slider */}
      <div className='container'>
        {/* Infinite slider component with specified properties */}
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {/* Rendering child components provided as 'children' */}
          {children}
        </Slider>
      </div>
    </div>
  );
};

// Exporting the 'Slide' component as the default export of this module
export default Slide;
