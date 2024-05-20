// Function to get the current user from local storage
const getCurrentUser = () => {
  // Retrieve the "currentUser" item from local storage and parse it as JSON
  return JSON.parse(localStorage.getItem('currentUser'));
};

// Export the getCurrentUser function as the default export of this module
export default getCurrentUser;
