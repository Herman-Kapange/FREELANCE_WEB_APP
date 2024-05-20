// Import the axios library for making HTTP requests
import axios from 'axios';

// Create a new axios instance with custom configurations
const newRequest = axios.create({
  // Set the base URL for the requests
  baseURL: 'http://localhost:8800/api/',

  // Include credentials (such as cookies) in the requests
  withCredentials: true,
});

// Export the newRequest instance as the default export of this module
export default newRequest;
