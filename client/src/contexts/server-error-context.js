import React, { createContext, useContext } from "react";

const ServerErrorContext = createContext();

export function useServerError() {
  const setServerError = useContext(ServerErrorContext);
  return [setServerError];
}

export function ServerErrorProvider({ setServerError, ...rest }) {
  return <ServerErrorContext.Provider value={setServerError} {...rest} />;
}
