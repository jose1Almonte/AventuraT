import React, { createContext, useContext, useEffect, useState } from 'react';
import currentLog from '../firebase/UserData';
import auth, { firebase } from '@react-native-firebase/auth';

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
