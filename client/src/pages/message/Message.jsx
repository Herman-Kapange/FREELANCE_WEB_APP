// Importing React, necessary hooks, and styles
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import './Message.scss';

// Functional component 'Message'
const Message = () => {
  // Extracting 'id' from route parameters
  const { id } = useParams();

  // Retrieving the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Creating an instance of queryClient from useQueryClient hook
  const queryClient = useQueryClient();

  // Fetching data for the current conversation using useQuery
  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  // Using useMutation for sending a new message
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      // Invalidating the "messages" query to trigger a refetch when a new message is sent
      queryClient.invalidateQueries(['messages']);
    },
  });

  // Handling form submission to send a new message
  const handleSubmit = (e) => {
    e.preventDefault();
    // Initiating the mutation to send a new message
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    // Clearing the input field after submitting the message
    e.target[0].value = '';
  };

  // Rendering the Message component
  return (
    <div className='message'>
      <div className='container'>
        {/* Breadcrumbs for navigation */}
        <span className='breadcrumbs'>
          <Link to='/messages'>Messages</Link> > John Doe >
        </span>
        {/* Handling loading and error states during data fetching */}
        {isLoading ? (
          'loading'
        ) : error ? (
          'error'
        ) : (
          // Displaying the list of messages
          <div className='messages'>
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? 'owner item' : 'item'}
                key={m._id}
              >
                {/* Displaying user image and message text */}
                <img
                  src='https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600'
                  alt=''
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        {/* Horizontal rule for separation */}
        <hr />
        {/* Form for writing and sending a new message */}
        <form className='write' onSubmit={handleSubmit}>
          <textarea type='text' placeholder='write a message' />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

// Exporting the 'Message' component as the default export of this module
export default Message;
