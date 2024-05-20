// Importing necessary modules from the 'react' library and other dependencies
import React from 'react';
import './GigCard.scss'; // Importing styles from the 'GigCard.scss' file
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

// Functional component 'GigCard'
const GigCard = ({ item }) => {
  // Using 'useQuery' hook to fetch user data based on 'item.userId'
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

  // Rendering the gig card with user information, gig details, and pricing
  return (
    <Link to={`/gig/${item._id}`} className='link'>
      {/* Container div for the gig card with a link to the gig details page */}
      <div className='gigCard'>
        {/* Gig cover image */}
        <img src={item.cover} alt='' />
        <div className='info'>
          {/* Checking loading and error states for user data */}
          {isLoading ? (
            'loading'
          ) : error ? (
            'Something went wrong!'
          ) : (
            // Displaying user information if data is available
            <div className='user'>
              <img src={data.img || '/img/noavatar.jpg'} alt='' />
              <span>{data.username}</span>
            </div>
          )}
          {/* Gig description */}
          <p>{item.desc}</p>
          {/* Star rating section */}
          <div className='star'>
            <img src='./img/star.png' alt='' />
            {/* Calculating and displaying the average star rating */}
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        {/* Horizontal line separating gig details and pricing */}
        <hr />
        {/* Bottom section with favorite icon and gig pricing */}
        <div className='detail'>
          {/* Favorite icon */}
          <img src='./img/heart.png' alt='' />
          {/* Pricing information */}
          <div className='price'>
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Exporting the 'GigCard' component as the default export of this module
export default GigCard;
