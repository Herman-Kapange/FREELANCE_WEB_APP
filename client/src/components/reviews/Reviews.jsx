// Importing necessary modules from the '@tanstack/react-query' library and 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import newRequest from '../../utils/newRequest'; // Importing a utility function for making API requests
import Review from '../review/Review'; // Importing the 'Review' component
import './Reviews.scss'; // Importing styles from the 'Reviews.scss' file

// Functional component 'Reviews'
const Reviews = ({ gigId }) => {
  // Creating a query client instance
  const queryClient = useQueryClient();

  // Using 'useQuery' hook to fetch reviews based on 'gigId'
  const { isLoading, error, data } = useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  // Using 'useMutation' hook for handling the submission of a new review
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post('/reviews', review);
    },
    onSuccess: () => {
      // Invalidating the 'reviews' query in the query client after a successful mutation
      queryClient.invalidateQueries(['reviews']);
    },
  });

  // Handling the form submission to add a new review
  const handleSubmit = (e) => {
    e.preventDefault();
    // Extracting review details from the form
    const desc = e.target[0].value;
    const star = e.target[1].value;
    // Calling the mutation function with the review details
    mutation.mutate({ gigId, desc, star });
  };

  // Rendering the Reviews component with a list of reviews and a form to add a new review
  return (
    <div className='reviews'>
      <h2>Reviews</h2>
      {/* Checking loading and error states for the reviews */}
      {isLoading
        ? 'loading'
        : error
        ? 'Something went wrong!'
        : data.map((review) => <Review key={review._id} review={review} />)}
      {/* Form to add a new review */}
      <div className='add'>
        <h3>Add a review</h3>
        <form action='' className='addForm' onSubmit={handleSubmit}>
          {/* Input for review text */}
          <input type='text' placeholder='write your opinion' />
          {/* Dropdown for selecting the star rating */}
          <select name='' id=''>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          {/* Button to submit the form */}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

// Exporting the 'Reviews' component as the default export of this module
export default Reviews;
