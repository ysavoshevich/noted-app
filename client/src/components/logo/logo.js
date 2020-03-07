import React, { memo } from "react";
import styled from "styled-components";
import { theme } from "../../theme";
import { shuffle } from "lodash";

const StyledLetter = styled.h1`
  color: ${props => props.background};
  font-weight: 700;
  font-size: 48px;
  margin: 0 3px;
`;

function Logo() {
  let backgrounds = [];
  for (let key in theme.buttonBg) {
    backgrounds.push(theme.buttonBg[key]);
  }
  backgrounds.push("#85D8CE");
  backgrounds = shuffle(backgrounds);
  let letters = backgrounds.map((background, index) => {
    switch (index) {
      case 0:
        return (
          <StyledLetter background={background} key={background}>
            N
          </StyledLetter>
        );
      case 1:
        return (
          <StyledLetter background={background} key={background}>
            O
          </StyledLetter>
        );
      case 2:
        return (
          <StyledLetter background={background} key={background}>
            T
          </StyledLetter>
        );
      case 3:
        return (
          <StyledLetter background={background} key={background}>
            E
          </StyledLetter>
        );
      case 4:
        return (
          <StyledLetter background={background} key={background}>
            D
          </StyledLetter>
        );
      default:
        return null;
    }
  });
  return <div style={{ display: "flex" }}>{letters}</div>;
}

export default memo(Logo);
