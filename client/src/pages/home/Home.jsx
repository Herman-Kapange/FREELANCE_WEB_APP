import React from 'react';
import './Home.scss';
import Featured from '../../components/featured/Featured';
import Slide from '../../components/slide/Slide';
import CatCard from '../../components/catCard/CatCard';
import ProjectCard from '../../components/projectCard/ProjectCard';
import { cards, projects } from '../../data';

// Functional component 'Home'
function Home() {
  return (
    <div className='home'>
      {/* Featured section */}
      <Featured />

      {/* Slide section with category cards */}
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>

      {/* Features section */}
      <div className='features'>
        <div className='container'>
          <div className='item'>
            <video src='./img/video.mp4' controls />
          </div>

          {/* Text item with features */}
          <div className='item'>
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className='title'>
              <img src='./img/check.png' alt='' />
              The best for every budget
            </div>
            <p>
              Discover top-notch services tailored to your budget. No hourly
              rates, just clear project-based pricing.
            </p>
            <div className='title'>
              <img src='./img/check.png' alt='' />
              Quality work done quickly
            </div>
            <p>
              Choose the perfect freelancer and kickstart your project within
              minutes.
            </p>
            <div className='title'>
              <img src='./img/check.png' alt='' />
              Protected payments, every time
            </div>
            <p>
              Rest easy with transparent upfront payment. Your funds are secure
              until you give the green light to the completed work.
            </p>
            <div className='title'>
              <img src='./img/check.png' alt='' />
              24/7 support
            </div>
            <p>
              Access top-notch services around the clock. No hourly rates, just
              project-based pricing.
            </p>
          </div>
        </div>
      </div>

      {/* Explore section with category items */}
      <div className='explore'>
        <div className='container'>
          <h1>Explore the marketplace</h1>
          <div className='items'>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg'
                alt=''
              />
              <div className='line'></div>
              <span>Graphics & Design</span>
            </div>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg'
                alt=''
              />
              <div className='line'></div>

              <span>Digital Marketing</span>
            </div>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg'
                alt=''
              />
              <div className='line'></div>
              <span>Writing & Translation</span>
            </div>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg'
                alt=''
              />
              <div className='line'></div>
              <span>Video & Animation</span>
            </div>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg'
                alt=''
              />
              <div className='line'></div>
              <span>Music & Audio</span>
            </div>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg'
                alt=''
              />
              <div className='line'></div>
              <span>Programming & Tech</span>
            </div>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg'
                alt=''
              />
              <div className='line'></div>
              <span>Business</span>
            </div>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg'
                alt=''
              />
              <div className='line'></div>
              <span>Lifestyle</span>
            </div>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg'
                alt=''
              />
              <div className='line'></div>
              <span>Data</span>
            </div>
            <div className='item'>
              <img
                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg'
                alt=''
              />
              <div className='line'></div>
              <span>Photography</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dark features section */}
      <div className='features dark'>
        <div className='container'>
          <div className='item'>
            <img src='./img/business.png' alt='' />
          </div>

          <div className='item'>
            <h1>
              WorkWyzeZM <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className='title'>
              <img src='./img/check.png' alt='' />
              Connect to freelancers with proven business experience
            </div>

            <div className='title'>
              <img src='./img/check.png' alt='' />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className='title'>
              <img src='./img/check.png' alt='' />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore WorkWyzeZM Business</button>
          </div>
        </div>
      </div>

      {/* Slide section with project cards */}
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

// Exporting the 'Home' component as the default export of this module
export default Home;
