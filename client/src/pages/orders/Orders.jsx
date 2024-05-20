// Importing necessary dependencies and styles
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Orders.scss';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

// Functional component 'Orders'
const Orders = () => {
  // Retrieving the current user from local storage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Using useNavigate hook from react-router-dom to enable navigation
  const navigate = useNavigate();

  // Fetching orders data using useQuery
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  // Handling contact button click for initiating or navigating to a conversation
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      // Attempting to get an existing conversation
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        // Creating a new conversation if it doesn't exist
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  // Rendering the Orders component
  return (
    <div className='orders'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <div className='container'>
          <div className='title'>
            <h1>Orders</h1>
          </div>
          {/* Displaying a table of orders */}
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Contact</th>
            </tr>
            {/* Mapping through orders to display each in a table row */}
            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  {/* Displaying the order's image */}
                  <img className='image' src={order.img} alt='' />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  {/* Button to initiate or navigate to a conversation */}
                  <img
                    className='message'
                    src='./img/message.png'
                    alt=''
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

// Exporting the 'Orders' component as the default export of this module
export default Orders;
