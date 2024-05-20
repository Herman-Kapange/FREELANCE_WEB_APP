// Importing necessary dependencies and styles
import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import './Messages.scss';
import moment from 'moment';

// Functional component 'Messages'
const Messages = () => {
  // Retrieving the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Creating an instance of queryClient from useQueryClient hook
  const queryClient = useQueryClient();

  // Fetching data for conversations using useQuery
  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  // Using useMutation for marking a conversation as read
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      // Invalidating the "conversations" query to trigger a refetch after marking as read
      queryClient.invalidateQueries(['conversations']);
    },
  });

  // Handling marking a conversation as read
  const handleRead = (id) => {
    mutation.mutate(id);
  };

  // Rendering the Messages component
  return (
    <div className='messages'>
      {isLoading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <div className='container'>
          <div className='title'>
            <h1>Messages</h1>
          </div>
          {/* Displaying a table of conversations */}
          <table>
            <tr>
              <th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {/* Mapping through conversations to display each in a table row */}
            {data.map((c) => (
              <tr
                className={
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  'active'
                }
                key={c.id}
              >
                <td>{currentUser.isSeller ? c.buyerId : c.sellerId}</td>
                <td>
                  {/* Link to the conversation with a preview of the last message */}
                  <Link to={`/message/${c.id}`} className='link'>
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td>
                  {/* Button to mark the conversation as read if unread */}
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={() => handleRead(c.id)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

// Exporting the 'Messages' component as the default export of this module
export default Messages;
