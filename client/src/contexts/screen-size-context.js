import React, { createContext, useContext } from "react";

const ScreenSizeContext = createContext();

export function useScreenSize() {
  const { small, medium } = useContext(ScreenSizeContext);
  return [small, medium];
}

export function ScreenSizeProvider({ matches, ...rest }) {
  return <ScreenSizeContext.Provider value={matches} {...rest} />;
}
