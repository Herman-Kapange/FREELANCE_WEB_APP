// Importing the global styles for the entire application
import './app.scss';

// Importing necessary components and functions from libraries and files
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Gigs from './pages/gigs/Gigs';
import Gig from './pages/gig/Gig';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Add from './pages/add/Add';
import Orders from './pages/orders/Orders';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import MyGigs from './pages/myGigs/MyGigs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Pay from './pages/pay/Pay';
import Success from './pages/success/Success';

// Main App component
function App() {
  // Creating a new instance of QueryClient for managing data queries
  const queryClient = new QueryClient();

  // Layout component that wraps the entire application structure
  const Layout = () => {
    return (
      <div className='app'>
        {/* Providing the QueryClient to manage data queries */}
        <QueryClientProvider client={queryClient}>
          {/* Including Navbar, Outlet (for nested routes), and Footer */}
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  // Creating a router for defining routes and their corresponding components
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, // Using the Layout component as the main layout for the "/" route
      children: [
        {
          path: '/', // Nested route for the home page
          element: <Home />,
        },
        {
          path: '/gigs',
          element: <Gigs />,
        },
        {
          path: '/myGigs',
          element: <MyGigs />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/messages',
          element: <Messages />,
        },
        {
          path: '/message/:id',
          element: <Message />,
        },
        {
          path: '/add',
          element: <Add />,
        },
        {
          path: '/gig/:id',
          element: <Gig />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/pay/:id',
          element: <Pay />,
        },
        {
          path: '/success',
          element: <Success />,
        },
      ],
    },
  ]);

  // Providing the router for the entire application
  return <RouterProvider router={router} />;
}

// Exporting the App component as the default export of this module
export default App;
