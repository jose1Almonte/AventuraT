import React, { createContext, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
};

export const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Este efecto se ejecutará una vez al montar el componente, y actualizará el usuario actual
  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe; // Se ejecuta al desmontar el componente para evitar fugas de memoria
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
