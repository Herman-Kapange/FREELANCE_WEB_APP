// Import the axios library for making HTTP requests
import axios from 'axios';

// Define an asynchronous function named 'upload' that takes a 'file' parameter
const upload = async (file) => {
  // Create a new FormData object for handling file uploads
  const data = new FormData();

  // Append the 'file' to the FormData object
  data.append('file', file);

  // Append the 'upload_preset' parameter with the value 'freelance' to the FormData object
  data.append('upload_preset', 'freelance');

  try {
    // Make a POST request to the upload link specified in the environment variable
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dehbjba70/upload',
      data
    );

    // Extract the 'url' property from the response data
    const { url } = res.data;

    // Return the URL of the uploaded file
    return url;
  } catch (err) {
    // Log any errors that occur during the upload process
    console.log(err);
  }
};

// Export the 'upload' function as the default export of this module
export default upload;
