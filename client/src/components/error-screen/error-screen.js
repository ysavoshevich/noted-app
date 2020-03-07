import React from "react";
import styled from "styled-components";

export const StyledErrorScreen = styled.div`
  width: 100vw;
  height: 100%;
  color: black;
  position: relative;
  background: white;
  padding: 50px;
  box-sizing: border-box;
  overflow: scroll;
  word-wrap: break-word;
`;

export default function ErrorScreen() {
  return (
    <StyledErrorScreen>
      <h2>Sorry! Something went wrong. Reload the page to try again.</h2>
    </StyledErrorScreen>
  );
}
