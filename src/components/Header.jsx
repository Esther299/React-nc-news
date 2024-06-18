import { Link } from 'react-router-dom';

function Header({ selectedUser }) {
  return (
    <header>
      <h1>NC News</h1>
      {selectedUser ? (
        <Link to="/profile">
          <button>Your Profile</button>
        </Link>
      ) : (
        <Link to="/signin">
          <button>Sign in</button>
        </Link>
      )}
      {selectedUser ? (<Link to="/signin">
          <button>Log out</button>
        </Link>): null}
    </header>
  );
}
export default Header;
