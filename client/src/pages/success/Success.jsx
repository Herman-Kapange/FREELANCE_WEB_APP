// Importing necessary dependencies
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

// Functional component 'Success'
const Success = () => {
  // Accessing the current URL search parameters and navigation hook
  const { search } = useLocation();
  const navigate = useNavigate();

  // Extracting the 'payment_intent' parameter from the URL
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');

  // useEffect hook to make a request when the component mounts
  useEffect(() => {
    // Function to make a request to update orders on successful payment
    const makeRequest = async () => {
      try {
        // Making a PUT request to update the order with the payment_intent
        await newRequest.put('/orders', { payment_intent });

        // Delaying the navigation to the orders page for 5 seconds
        setTimeout(() => {
          navigate('/orders');
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    // Invoking the makeRequest function
    makeRequest();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  // Rendering a message indicating successful payment and a redirection notice
  return (
    <div>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

// Exporting the 'Success' component as the default export of this module
export default Success;
