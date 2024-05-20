// Importing necessary dependencies and styles
import React, { useEffect, useState } from 'react';
import './Pay.scss';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import newRequest from '../../utils/newRequest';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

// Loading the Stripe public key
const stripePromise = loadStripe(
  'pk_test_51OHwRrAI4nN8ufyJTdntoPmYKDMB8at7glMgOoLUKvHiD2bNrUTj2q0cW1l9BBXnzhA5lUo6J9nzK3LpHcJeh99w00zPxg4yyu'
);

// Functional component 'Pay'
const Pay = () => {
  // State to store the client secret received from the server
  const [clientSecret, setClientSecret] = useState('');

  // Extracting the 'id' parameter from the route
  const { id } = useParams();

  // Fetching the client secret from the server on component mount
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  // Appearance configuration for Elements
  const appearance = {
    theme: 'stripe',
  };

  // Options configuration for Elements
  const options = {
    clientSecret,
    appearance,
  };

  // Rendering the 'Pay' component
  return (
    <div className='pay'>
      {/* Checking if client secret is available before rendering Elements */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {/* Rendering the CheckoutForm component with Stripe Elements */}
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

// Exporting the 'Pay' component as the default export of this module
export default Pay;
