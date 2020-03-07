import styled from "styled-components";
import { theme } from "../../theme";

export const StyledInputWrapper = styled.div`
  width: 90%;
  margin: 20px 10px;
  border-radius: 3px;
`;

export const StyledLabel = styled.label`
  color: ${props => (props.labelId ? "white" : "black")};
  padding: ${props => (props.labelId ? "7px" : "0px")};
  font-weight: 600;
  font-size: 18px;
  background: ${props => {
    return theme.labelBg[props.labelId];
  }};
`;

export const StyledInput = styled.input`
  width: 100%;
  display: block;
  padding: 5px;
  margin: 10px 0px;
  border: 1px solid grey;
  border-radius: 2px;
`;
export const StyledTextarea = styled.textarea`
  width: 100%;
  display: block;
  padding: 5px;
  margin: 10px 0px;
  border: 1px solid grey;
  border-radius: 2px;
  font-family: inherit;
`;
