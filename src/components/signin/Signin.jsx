import { getUserByUsername } from '../../api';
import './Signin.module.css';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Signin.module.css';
import { UserContext } from '../../contexts/UserContext';

const SignIn = ({ users }) => {
  const {
    isLoading,
    setIsLoading,
    errorMsg,
    setErrorMsg,
    errorCode,
    setErrorCode,
    isLoggedIn,
    setIsLoggedIn,
    setSelectedUser,
  } = useContext(UserContext);

  const [currUser, setCurrUser] = useState('');
  const [viewUser, setViewUser] = useState(null);

  const handleChange = (event) => {
    const username = event.target.value;
    setCurrUser(username);
    setIsLoading(true);
    if (username) {
      getUserByUsername(username)
        .then((fetchedUser) => {
          setViewUser(fetchedUser);
          setIsLoading(false);
        })
        .catch(({ response: { data, status } }) => {
          setErrorMsg(data.msg);
          setErrorCode(status);
          setIsLoading(false);
        });
    } else {
      setViewUser(null);
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (viewUser) {
      setSelectedUser(viewUser);
      setIsLoggedIn(true);
    } else {
      setSelectedUser(null);
      setIsLoggedIn(false);
    }
  };
  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (isLoggedIn) {
    return <p className={styles.logged}>You have successfully signed in</p>;
  }

  if (errorCode || errorMsg) {
    return (
      <p>
        {errorCode}: {errorMsg}
      </p>
    );
  }

  return (
    !isLoggedIn && (
      <div className={styles.signin}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <select
            className={styles.userSelect}
            value={currUser}
            onChange={handleChange}
          >
            <option value={''}>Select a user</option>
            {users.map((user) => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {viewUser && (
          <>
            <hr />
            <div className={styles.selectedUser}>
              <h3>Selected User</h3>
              <p>
                <span>Username:</span> {viewUser.username}
              </p>
              <p>
                <span>Name:</span> {viewUser.name}
              </p>
              <img
                className={styles.userImage}
                src={viewUser.avatar_url}
                alt={`${viewUser.username}'s avatar`}
              />
            </div>
          </>
        )}
        <hr />
        <Link className={styles.link} to={`/`}>
          <button>Home</button>
        </Link>
      </div>
    )
  );
};

export default SignIn;
