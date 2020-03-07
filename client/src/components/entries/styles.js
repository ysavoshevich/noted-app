import styled from "styled-components";
import { animated } from "react-spring";
import { ENTRY_HEIGHT } from "../../constants";

export const StyledEntries = styled(animated.div)`
  height: ${props => {
    if (props.small) {
      return "70%";
    }
    if (props.medium) {
      return "60%";
    }
    return "80%";
  }};
  width: ${props => (props.small ? `100%` : `60%`)};
  margin: 150px auto 5% auto;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const StyledEntry = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: ${ENTRY_HEIGHT}px;
  background: rgba(0, 0, 0, 0.05);
  transition: background 0.35s ease;
  user-select: none;
  cursor: pointer;
  color: white;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  h3 {
    font-size: ${props => (props.small ? `15px` : "18px")};
    user-select: none;
    display: inline;
  }
`;

export const ButtonWrapper = styled(animated.div)`
  position: absolute;
  top: 10%;
  display: flex;
`;
