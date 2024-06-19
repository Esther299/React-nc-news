import { getUserByUsername } from '../api';
import './Signin.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = ({ users, setSelectedUser }) => {
  const [currUser, setCurrUser] = useState('');
  const [viewUser, setViewUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState(null);

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
        .catch(({response: {data, status}}) => {
          setErrorMsg(data.msg);
          setErrorCode(status)
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

  return isLoggedIn ? (
    <p>You have successfully signed in</p>
  ) : (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <select
          className="user-select"
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
          {errorCode && errorMsg ? <p>{errorCode}: {errorMsg}</p> : null}
      </form>
      {viewUser && (
        <div className="selected-user">
          <h3>Selected User</h3>
          <p>Username: {viewUser.username}</p>
          <p>Name: {viewUser.name}</p>
          <img
            className="user-image"
            src={viewUser.avatar_url}
            alt={`${viewUser.username}'s avatar`}
          />
        </div>
      )}
      <hr />
      <Link className="link" to={`/`}>
        <button>Home</button>
      </Link>
    </div>
  );
};

export default SignIn;
