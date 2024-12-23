import { Login } from '@mui/icons-material';
import React, { createContext, useState, useContext } from 'react';


export  const authContext = createContext({
    loggedIn : false,
    user : {},
    
    login :(value) => {},
    logout:() => {},
    
    
    
});





export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  

  const login = (value) => {
    setLoggedIn(true);
    setUser(value);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser({});
  };

  return (
    <authContext.Provider value={{ loggedIn, user, login,logout }}>
      {children}
    </authContext.Provider>
  );
};
