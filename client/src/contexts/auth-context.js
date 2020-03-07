import React, { createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  const token = useContext(AuthContext);
  return [token];
}

export function AuthProvider({ token, ...rest }) {
  return <AuthContext.Provider value={token} {...rest} />;
}
