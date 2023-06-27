import React, { createContext, useState } from 'react';

export const ValuesContext = createContext();

export const ValuesContextProvider = ({ children }) => {
  const [actualizaPerfil, setActualizaPerfil] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    // closeFilterOptionsView();
    setIsOpen(!isOpen);
  };

  return (
    <ValuesContext.Provider value={{ actualizaPerfil, setActualizaPerfil, isOpen, setIsOpen, toggleMenu }}>
      {children}
    </ValuesContext.Provider>
  );
};
