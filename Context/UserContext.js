import React, { createContext, useContext, useState } from 'react';
import currentLog from '../firebase/UserData';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(currentLog());
  const [isLogged, setLogged] = useState(!!user);

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, setLogged }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
