import { getUserByUsername } from '../api';
import { Link } from 'react-router-dom';
import './Signin.css'
import Profile from './signin-components/Profile';

const SignIn = ({ users, setSelectedUser, selectedUser }) => {

  const handleUserSelect = (event) => {
    const username = event.target.value;
    if (username) {
      getUserByUsername(username)
        .then((fetchedUser) => {
          setSelectedUser(fetchedUser);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    } else {
      setSelectedUser(null);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form>
        <select
          className="user-select"
          value={selectedUser ? selectedUser.username : ''}
          onChange={handleUserSelect}
        >
          <option value={''}>Select a user</option>
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <Link to={`/`}>
          <button type="submit">Sign in</button>
        </Link>
      </form>
      <Profile selectedUser={selectedUser} />
    </div>
  );
};

export default SignIn;
