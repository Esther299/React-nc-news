import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { UserContext } from '../../contexts/UserContext';

function Navbar({ topics }) {
  const { errorMsg, errorCode } = useContext(UserContext);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (errorCode || errorMsg) {
    return (
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link className={styles.link} to="/">
              Home
            </Link>
          </li>
        </ul>
        <p className="error">
          {errorCode}: {errorMsg}
        </p>
      </nav>
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
