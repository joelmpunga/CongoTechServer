import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role,setRole] = useState(false);
  const [nom, setNom] = useState(false);
  const [postnom, setPostnom] = useState(false);

  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });


  const [idfile, setIdFile] = useState('');

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


  

  const handleContextMenu = (e) => {
    e.preventDefault();
    setIdFile(e.id)
    setContextMenuVisible(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };
 

  




  return (
    <MyContext.Provider value={{idfile, setIdFile, handleContextMenu, handleCloseContextMenu, contextMenuVisible, contextMenuPosition, isAuthenticated, updateIsAuthenticated,role,updateRole,nom,updateNom,postnom,updatePostNom }}>
      {children}
    </MyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
  return useContext(MyContext);
};
