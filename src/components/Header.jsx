import { Link } from 'react-router-dom';

function Header({ selectedUser, setSelectedUser }) {
  const handleLogout = () => {
    setSelectedUser(null);
  };
  return (
    <header>
      <h1>NC News</h1>
      {selectedUser ? (
        <>
          <Link to="/profile">
            <button>Your Profile</button>
          </Link>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <Link to="/signin">
          <button>Sign in</button>
        </Link>
      )}
    </header>
  );
}
export default Header;
