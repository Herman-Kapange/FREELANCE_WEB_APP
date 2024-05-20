// Importing necessary modules from the 'react' library and Stripe's React components
import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Functional component 'CheckoutForm'
const CheckoutForm = () => {
  // Accessing the Stripe context with 'useStripe' hook
  const stripe = useStripe();
  const elements = useElements();

  // State variables for email, message, and loading state
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Effect hook to handle payment status when Stripe is loaded
  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieving the payment intent client secret from the URL query parameters
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    // Retrieving payment intent details and updating the message based on its status
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Setting loading state to true
    setIsLoading(true);

    // Confirming the payment with Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:5173/success',
      },
    });

    // Handling errors and updating the message accordingly
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    // Setting loading state to false
    setIsLoading(false);
  };

  // Options for PaymentElement
  const paymentElementOptions = {
    layout: 'tabs',
  };

  // Rendering the form with LinkAuthenticationElement and PaymentElement
  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      {/* Input for LinkAuthenticationElement to capture email */}
      <LinkAuthenticationElement
        id='link-authentication-element'
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Stripe PaymentElement for card details */}
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      {/* Button for submitting the payment */}
      <button disabled={isLoading || !stripe || !elements} id='submit'>
        <span id='button-text'>
          {isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
};

// Exporting the 'CheckoutForm' component as the default export of this module
export default CheckoutForm;
