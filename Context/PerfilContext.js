import React, { createContext, useState } from 'react';

export const PerfilContext = createContext();

export const PerfilProvider = ({ children }) => {
  const [actualizaPerfil, setActualizaPerfil] = useState(true);

  return (
    <PerfilContext.Provider value={{ actualizaPerfil, setActualizaPerfil }}>
      {children}
    </PerfilContext.Provider>
  );
};
