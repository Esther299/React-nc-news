import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../../api';
import styles from './Navbar.module.css';

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (errorCode || errorMsg) {
    return (
      <p>
        {errorCode}: {errorMsg}
      </p>
    );
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link className={styles.link} to="/">
            Home
          </Link>
        </li>

        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <Link className={styles.link} to={`/${topic.slug}`}>
                {capitalizeFirstLetter(topic.slug)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default Navbar;
