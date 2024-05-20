// Importing necessary modules from 'react' and external libraries
import React from 'react';
import './Gig.scss'; // Importing styles from the 'Gig.scss' file
import { Slider } from 'infinite-react-carousel/lib'; // Importing the 'Slider' component from the 'infinite-react-carousel' library
import { Link, useParams } from 'react-router-dom'; // Importing components from 'react-router-dom' for routing
import { useQuery } from '@tanstack/react-query'; // Importing the 'useQuery' hook for fetching data
import newRequest from '../../utils/newRequest'; // Importing a utility function for making API requests
import Reviews from '../../components/reviews/Reviews'; // Importing the 'Reviews' component

// Functional component 'Gig'
function Gig() {
  // Extracting the 'id' parameter from the URL using the 'useParams' hook
  const { id } = useParams();

  // Fetching gig data using the 'useQuery' hook
  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  // Extracting the userId from the fetched data
  const userId = data?.userId;

  // Fetching user data using the 'useQuery' hook, with a dependency on userId
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId, // Ensuring that the query is enabled only if userId is available
  });

  // Rendering the 'Gig' component
  return (
    <div className='gig'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'Something went wrong!'
      ) : (
        <div className='container'>
          {/* Left section containing gig details */}
          <div className='left'>
            {/* Breadcrumbs and gig title */}
            <span className='breadcrumbs'>
              WorkWyzeZM {'>'} Graphics & Design {'>'}
            </span>
            <h1>{data.title}</h1>

            {/* User information section */}
            {isLoadingUser ? (
              'loading'
            ) : errorUser ? (
              'Something went wrong!'
            ) : (
              <div className='user'>
                {/* User profile picture, username, and star rating */}
                <img
                  className='pp'
                  src={dataUser.img || '/img/noavatar.jpg'}
                  alt=''
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className='stars'>
                    {/* Star rating */}
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src='/img/star.png' alt='' key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Image slider for gig images */}
            {/* {console.log(data)} */}
            {/* <Slider slidesToShow={1} arrowsScroll={1} className='slider'>
              {data.images.map((img) => (
                <img key={img} src={img} alt='' />
              ))}
            </Slider> */}

            {/* Description of the gig */}
            <h2>About This Gig</h2>
            <p>{data.desc}</p>

            {/* Seller information section */}
            {isLoadingUser ? (
              'loading'
            ) : errorUser ? (
              'Something went wrong!'
            ) : (
              <div className='seller'>
                <h2>About The Seller</h2>

                {/* Seller's profile picture, username, star rating, and contact button */}
                <div className='user'>
                  <img src={dataUser.img || '/img/noavatar.jpg'} alt='' />
                  <div className='info'>
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className='stars'>
                        {/* Seller's star rating */}
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src='/img/star.png' alt='' key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>

                {/* Seller's details */}
                <div className='box'>
                  <div className='items'>
                    <div className='item'>
                      <span className='title'>From</span>
                      <span className='desc'>{dataUser.country}</span>
                    </div>
                    <div className='item'>
                      <span className='title'>Member since</span>
                      <span className='desc'>Aug 2022</span>
                    </div>
                    <div className='item'>
                      <span className='title'>Avg. response time</span>
                      <span className='desc'>4 hours</span>
                    </div>
                    <div className='item'>
                      <span className='title'>Last delivery</span>
                      <span className='desc'>1 day</span>
                    </div>
                    <div className='item'>
                      <span className='title'>Languages</span>
                      <span className='desc'>English</span>
                    </div>
                  </div>
                  <hr />

                  {/* Seller's description */}
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}

            {/* Reviews section */}
            <Reviews gigId={id} />
          </div>

          {/* Right section containing gig pricing and details */}
          <div className='right'>
            {/* Gig pricing information */}
            <div className='price'>
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>

            {/* Short description of the gig */}
            <p>{data.shortDesc}</p>

            {/* Details of the gig, including delivery time, revisions, and features */}
            <div className='details'>
              <div className='item'>
                <img src='/img/clock.png' alt='' />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className='item'>
                <img src='/img/recycle.png' alt='' />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>

            {/* Features of the gig */}
            <div className='features'>
              {data.features.map((feature) => (
                <div className='item' key={feature}>
                  <img src='/img/greencheck.png' alt='' />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Link to the payment page */}
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Exporting the 'Gig' component as the default export of this module
export default Gig;
