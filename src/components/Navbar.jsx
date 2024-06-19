import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../api';

function Navbar() {
  const [topics, setTopics] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState(null);
  
  useEffect(() => {
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
      })
      .catch(({ response: { data, status } }) => {
        setErrorMsg(data.msg);
        setErrorCode(status);
      });
  }, []);

  return !errorCode && !errorMsg ? (
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
  ) : (<p>{errorCode}: {errorMsg}</p>)
}
export default Navbar;
