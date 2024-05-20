// Importing necessary dependencies and styles
import React from 'react';
import { Link } from 'react-router-dom';
import './MyGigs.scss';
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

// Functional component 'MyGigs'
function MyGigs() {
  // Retrieving the current user using the 'getCurrentUser' utility
  const currentUser = getCurrentUser();

  // Creating an instance of queryClient from useQueryClient hook
  const queryClient = useQueryClient();

  // Fetching data for the user's gigs using useQuery
  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  // Using useMutation for deleting a gig
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      // Invalidating the "myGigs" query to trigger a refetch after deleting a gig
      queryClient.invalidateQueries(['myGigs']);
    },
  });

  // Handling gig deletion
  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  // Rendering the MyGigs component
  return (
    <div className='myGigs'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <div className='container'>
          <div className='title'>
            <h1>Gigs</h1>
            {/* Displaying the 'Add New Gig' button if the user is a seller */}
            {currentUser.isSeller && (
              <Link to='/add'>
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          {/* Displaying a table of the user's gigs */}
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {/* Mapping through gigs to display each in a table row */}
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  {/* Displaying the gig's cover image */}
                  <img className='image' src={gig.cover} alt='' />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  {/* Button to delete a gig */}
                  <img
                    className='delete'
                    src='./img/delete.png'
                    alt=''
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

// Exporting the 'MyGigs' component as the default export of this module
export default MyGigs;
