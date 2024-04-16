import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role,setRole] = useState(false);
  const [nom, setNom] = useState(false);
  const [postnom, setPostnom] = useState(false);

  const updateIsAuthenticated = (newData) => {
    setIsAuthenticated(newData);
  };
  const updateRole = (newData) => {
    setRole(newData);
  };
  const updateNom =(newData) => {
    setNom(newData);
  }
  const updatePostNom = (newData) => {
    setPostnom(newData);
  }


  return (
    <MyContext.Provider value={{ isAuthenticated, updateIsAuthenticated,role,updateRole,nom,updateNom,postnom,updatePostNom }}>
      {children}
    </MyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
  return useContext(MyContext);
};
