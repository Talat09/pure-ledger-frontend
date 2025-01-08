/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("token") || null // Store the token directly, without parsing it
  );

  const updateUser = (user) => {
    console.log("from auth context:", user);
    if (user) {
      setCurrentUser(user.token || user); // Update with token or directly with user if no token
    } else {
      setCurrentUser(null); // Reset currentUser to null on logout
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("token", currentUser);
    } else {
      localStorage.removeItem("token"); // Remove token when user is null (logged out)
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
