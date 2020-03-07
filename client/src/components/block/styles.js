import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";

export const StyledBlock = styled(animated.div)`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
  background: ${props => props.background};
  cursor: ${props => (props.expanded ? "default" : "pointer")};
  &:focus {
    outline: 1px solid blue;
  }
`;

export const StyledHeader = styled(animated.h1)`
  position: absolute;
  color: white;
  font-size: 40px;
  margin: 0;
  user-select: none;
  user-drag: none;
  app-region: no-drag;
  pointer-events: none;
`;

const Icon = ({ className, style }) => (
  <animated.i className={className} style={style}></animated.i>
);

export const StyledIcon = styled(Icon)`
  position: absolute;
  top: 59%;
  color: white;
  pointer-events: none;
  user-select: none;
  user-drag: none;
  app-region: no-drag;
`;
