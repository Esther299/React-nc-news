import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        errorMsg,
        setErrorMsg,
        errorCode,
        setErrorCode,
        isLoggedIn,
        setIsLoggedIn,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
