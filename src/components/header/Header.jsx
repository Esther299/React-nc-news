import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';

function Header() {
  const { selectedUser, setSelectedUser, setIsLoggedIn } =
    useContext(UserContext);
  const handleLogout = () => {
    setSelectedUser(null);
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <h1>NC News</h1>
      <div className={styles.buttons}>
        <Link to="/profile">
          <button>Your Profile</button>
        </Link>
        {selectedUser ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <Link to="/signin">
            <button>Sign in</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
