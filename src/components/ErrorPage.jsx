import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';


const ErrorPage = () => {
  const { errorCode, errorMsg } = useContext(UserContext);

  return (
    <div className="error-page">
      <h1 className="error-code">Error {errorCode}</h1>
      <p className="error-message">{errorMsg}</p>
      <Link className="home-link" to="/">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
