// Importing necessary modules from 'react' and external libraries
import React, { useEffect, useRef, useState } from 'react';
import './Gigs.scss'; // Importing styles from the 'Gigs.scss' file
import GigCard from '../../components/gigCard/GigCard'; // Importing the 'GigCard' component
import { useQuery } from '@tanstack/react-query'; // Importing the 'useQuery' hook for fetching data
import newRequest from '../../utils/newRequest'; // Importing a utility function for making API requests
import { useLocation } from 'react-router-dom'; // Importing the 'useLocation' hook for accessing the current URL parameters

// Functional component 'Gigs'
function Gigs() {
  // State variables for sorting, menu visibility, and budget range
  const [sort, setSort] = useState('sales');
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  // Extracting search parameters from the current URL using 'useLocation'
  const { search } = useLocation();

  // Fetching gig data using the 'useQuery' hook
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  // Sorting menu options
  console.log(data);

  // Function to change the sorting type and close the menu
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  // Effect to refetch data when the sorting type changes
  useEffect(() => {
    refetch();
  }, [sort]);

  // Function to apply budget range and refetch data
  const apply = () => {
    refetch();
  };

  // Rendering the 'Gigs' component
  return (
    <div className='gigs'>
      <div className='container'>
        {/* Breadcrumbs and section title */}
        <span className='breadcrumbs'>WorkWyzeZM - Graphics & Design -</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with WorkWyzeZM's AI
          artists
        </p>

        {/* Budget and sorting menu */}
        <div className='menu'>
          <div className='left'>
            <span>Budget</span>
            <input ref={minRef} type='number' placeholder='min' />
            <input ref={maxRef} type='number' placeholder='max' />
            <button onClick={apply}>Apply</button>
          </div>
          <div className='right'>
            <span className='sortBy'>Sort by</span>
            <span className='sortType'>
              {sort === 'sales' ? 'Best Selling' : 'Newest'}
            </span>
            <img src='./img/down.png' alt='' onClick={() => setOpen(!open)} />

            {/* Dropdown menu for sorting options */}
            {open && (
              <div className='rightMenu'>
                {sort === 'sales' ? (
                  <span onClick={() => reSort('createdAt')}>Newest</span>
                ) : (
                  <span onClick={() => reSort('sales')}>Best Selling</span>
                )}
                <span onClick={() => reSort('sales')}>Popular</span>
              </div>
            )}
          </div>
        </div>

        {/* Gig cards */}
        <div className='cards'>
          {isLoading
            ? 'loading'
            : error
            ? 'Something went wrong!'
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

// Exporting the 'Gigs' component as the default export of this module
export default Gigs;
