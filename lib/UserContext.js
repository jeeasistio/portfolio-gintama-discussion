import nookies from 'nookies'
import { createContext, useEffect, useState } from 'react'


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  const userCookie = nookies.get().loggedInUser;
  
  const [loggedInUser, setLoggedInUser] = useState('Guest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = () => {
    setIsLoggedIn(true);
    setLoggedInUser(userCookie);
  }
  
  const logout = () => {
    setIsLoggedIn(false);
    setLoggedInUser('Guest');
  }
  
  useEffect(() => {
    if (userCookie) {
      login()
    }
  }, [userCookie, loggedInUser, isLoggedIn])
  
  return (
    <UserContext.Provider value={{ 
      loggedInUser,
      isLoggedIn,
      logout
    }}>
      { children }
    </UserContext.Provider>
  )
}