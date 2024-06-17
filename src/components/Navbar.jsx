import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../api';

function Navbar({ topics, setTopics }) {
  useEffect(() => {
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
      })
      .catch((err) => {
        console.error('Error fetching topics:', err);
      });
  }, []);

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>

        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <Link className="link" to={`/${topic.slug}`}>
                {topic.slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default Navbar;
