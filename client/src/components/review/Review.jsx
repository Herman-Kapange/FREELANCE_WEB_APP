// Importing necessary modules from the '@tanstack/react-query' library and 'react'
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import newRequest from '../../utils/newRequest'; // Importing a utility function for making API requests
import './Review.scss'; // Importing styles from the 'Review.scss' file

// Functional component 'Review'
const Review = ({ review }) => {
  // Using 'useQuery' hook to fetch user data based on 'review.userId'
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  // Rendering a review with user information, star rating, review text, and helpful options
  return (
    <div className='review'>
      {/* Checking loading and error states for user data */}
      {isLoading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        // Displaying user information if data is available
        <div className='user'>
          {/* User profile picture */}
          <img className='pp' src={data.img || '/img/noavatar.jpg'} alt='' />
          <div className='info'>
            {/* Username */}
            <span>{data.username}</span>
            <div className='country'>
              {/* User's country */}
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      {/* Star rating section */}
      <div className='stars'>
        {/* Displaying star images based on the review's star rating */}
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src='/img/star.png' alt='' key={i} />
          ))}
        {/* Displaying the numerical star rating */}
        <span>{review.star}</span>
      </div>
      {/* Review text */}
      <p>{review.desc}</p>
      {/* Helpful options section */}
      <div className='helpful'>
        <span>Helpful?</span>
        {/* Like button */}
        <img src='/img/like.png' alt='' />
        <span>Yes</span>
        {/* Dislike button */}
        <img src='/img/dislike.png' alt='' />
        <span>No</span>
      </div>
    </div>
  );
};

// Exporting the 'Review' component as the default export of this module
export default Review;
