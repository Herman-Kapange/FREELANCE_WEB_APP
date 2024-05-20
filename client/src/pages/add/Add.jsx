// Importing necessary modules from 'react' and external libraries
import React, { useReducer, useState } from 'react';
import './Add.scss'; // Importing styles from the 'Add.scss' file
import { gigReducer, INITIAL_STATE } from '../../reducers/gigReducer'; // Importing gig reducer and initial state
import upload from '../../utils/upload'; // Importing a utility function for uploading files
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Importing hooks for handling mutations and managing the query client
import newRequest from '../../utils/newRequest'; // Importing a utility function for making API requests
import { useNavigate } from 'react-router-dom'; // Importing the 'useNavigate' hook for programmatic navigation

// Functional component 'Add'
const Add = () => {
  // State for single file upload
  const [singleFile, setSingleFile] = useState(undefined);
  // State for multiple file uploads
  const [files, setFiles] = useState([]);
  // State for tracking file uploading status
  const [uploading, setUploading] = useState(false);

  // Using 'useReducer' hook to manage gig-related state using a reducer function
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  // Event handler for handling changes in input fields
  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // Event handler for adding a feature to the gig
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_FEATURE',
      payload: e.target[0].value,
    });
    e.target[0].value = '';
  };

  // Function for handling file uploads
  const handleUpload = async () => {
    setUploading(true);
    try {
      // Uploading the cover image
      const cover = await upload(singleFile);

      // Uploading multiple images and getting their URLs
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      // Setting uploading status to false and updating state with cover and image URLs
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  // Accessing the 'useNavigate' hook for programmatic navigation
  const navigate = useNavigate();

  // Accessing the query client for managing queries
  const queryClient = useQueryClient();

  // Using 'useMutation' hook for handling the gig creation mutation
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post('/gigs', gig);
    },
    onSuccess: () => {
      // Invalidating the 'myGigs' query in the query client after a successful mutation
      queryClient.invalidateQueries(['myGigs']);
    },
  });

  // Event handler for handling the gig submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    // Navigating to the user's gigs page after successful submission
    navigate('/mygigs');
  };

  console.log(state);

  // Rendering the 'Add' component with form sections for gig information and details
  return (
    <div className='add'>
      <div className='container'>
        <h1>Add New Gig</h1>
        <div className='sections'>
          {/* Section for gig information */}
          <div className='info'>
            <label htmlFor=''>Title</label>
            <input
              type='text'
              name='title'
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor=''>Category</label>
            <select name='cat' id='cat' onChange={handleChange}>
              <option value='design'>Design</option>
              <option value='web'>Web Development</option>
              <option value='animation'>Animation</option>
              <option value='music'>Music</option>
            </select>
            {/* Section for image uploads */}
            <div className='images'>
              <div className='imagesInputs'>
                <label htmlFor=''>Cover Image</label>
                <input
                  type='file'
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor=''>Upload Images</label>
                <input
                  type='file'
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? 'uploading' : 'Upload'}
              </button>
            </div>
            <label htmlFor=''>Description</label>
            <textarea
              name='desc'
              id=''
              placeholder='Brief descriptions to introduce your service to customers'
              cols='0'
              rows='16'
              onChange={handleChange}
            ></textarea>
            {/* Button to submit the form */}
            <button onClick={handleSubmit}>Create</button>
          </div>

          {/* Section for gig details */}
          <div className='details'>
            <label htmlFor=''>Service Title</label>
            <input
              type='text'
              name='shortTitle'
              placeholder='e.g. One-page web design'
              onChange={handleChange}
            />
            <label htmlFor=''>Short Description</label>
            <textarea
              name='shortDesc'
              onChange={handleChange}
              id=''
              placeholder='Short description of your service'
              cols='30'
              rows='10'
            ></textarea>
            <label htmlFor=''>Delivery Time (e.g. 3 days)</label>
            <input type='number' name='deliveryTime' onChange={handleChange} />
            <label htmlFor=''>Revision Number</label>
            <input
              type='number'
              name='revisionNumber'
              onChange={handleChange}
            />
            <label htmlFor=''>Add Features</label>
            <form action='' className='add' onSubmit={handleFeature}>
              <input type='text' placeholder='e.g. page design' />
              <button type='submit'>add</button>
            </form>
            {/* Displaying added features */}
            <div className='addedFeatures'>
              {state?.features?.map((f) => (
                <div className='item' key={f}>
                  {/* Button to remove a feature */}
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_FEATURE', payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor=''>Price</label>
            <input type='number' onChange={handleChange} name='price' />
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the 'Add' component as the default export of this module
export default Add;
