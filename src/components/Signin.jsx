import { getUserByUsername } from '../api';
import './Signin.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = ({ users, setSelectedUser }) => {
  const [currUser, setCurrUser] = useState('');
  const [viewUser, setViewUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event) => {
    const username = event.target.value;
    setCurrUser(username);
    if (username) {
      getUserByUsername(username)
        .then((fetchedUser) => {
          setViewUser(fetchedUser);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    } else {
      setViewUser(null);
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

  return isLoggedIn ? (
    <Link className="link" to={`/profile`}>
      <button>See Profile</button>
    </Link>
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

        <button type="submit">Sign in</button>
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
