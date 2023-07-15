/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  return (
    <AuthContext.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
