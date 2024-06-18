import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../api';

function Navbar() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
      })
      .catch(() => {
        setError('Error fetching topics');
      });
  }, []);

  return !error ? (
    <nav className="navbar">
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
  ) : (<p>{error}</p>)
}
export default Navbar;
