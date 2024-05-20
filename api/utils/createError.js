// Utility function to create custom error objects
const createError = (status, message) => {
  // Creating a new Error object
  const err = new Error();

  // Setting the status code for the error
  err.status = status;

  // Setting the error message
  err.message = message;

  // Returning the custom error object
  return err;
};

// Exporting the createError function for use in other parts of the application
export default createError;
