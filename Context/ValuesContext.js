import React, { createContext, useState } from 'react';

export const ValuesContext = createContext();

export const ValuesContextProvider = ({ children }) => {
  const [actualizaPerfil, setActualizaPerfil] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // meaning filterOptionsView
  const [isInputSearch2Open, setIsInputSearch2Open] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
    <ValuesContext.Provider value={{ actualizaPerfil, setActualizaPerfil, isOpen, setIsOpen, toggleMenu, isInputSearch2Open, setIsInputSearch2Open }}>
      {children}
    </ValuesContext.Provider>
  );
};
