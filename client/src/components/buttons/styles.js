import styled from "styled-components";
import { theme } from "../../theme";

export const StyledButton = styled.button`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: ${props => (props.size === "small" ? "6px 12px" : "10px 16px")};
  font-weight: 600;
  border-radius: 32px;
  cursor: pointer;
  line-height: 1.2;
  border: none;
  transition: box-shadow 0.2s ease-in-out, background 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.8);
  color: black;
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

export const StyledLoginButton = styled(StyledButton)`
  background: ${theme.labelBg.articles};
  width: 72px;
  color: white;
  border-radius: 0;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  &:hover {
    background: ${theme.labelBg.articles};
    transform: translateY(-3px);
    box-shadow: 4px 3px 12px 0px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    background: ${theme.labelBg.articles};
    transform: translateY(-3px);
    box-shadow: 4px 3px 12px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledRegisterButton = styled(StyledButton)`
  background: ${theme.labelBg.music};
  border-radius: 0;
  width: 86px;
  color: white;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  &:hover {
    background: ${theme.labelBg.music};
    transform: translateY(-3px);
    box-shadow: 4px 3px 12px 0px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    background: ${theme.labelBg.music};
    transform: translateY(-3px);
    box-shadow: 4px 3px 12px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledAddButton = styled(StyledButton)`
  margin: 0px 5px;
`;

export const StyledSaveAndCloseButton = styled(StyledButton)`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  &:hover {
    background: rgba(0, 0, 0, 1);
  }
`;

export const StyledIconButton = styled.i`
  color: white;
  opacity: 0.6;
  font-size: ${props => (props.small ? `18px` : `23px`)};
  padding: ${props => (props.small ? `2px 5px` : `10px`)};
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
`;

export const StyledSaveButton = styled(StyledButton)`
  margin: auto;
  background: none;
  color: green;
  width: 100px;
  border: 1px solid green;
  border-radius: 2px;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  &:hover {
    background: none;
    transform: translateY(-3px);
    box-shadow: 4px 3px 12px 0px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    background: none;
    transform: translateY(-3px);
    box-shadow: 4px 3px 12px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledCancelButton = styled(StyledButton)`
  margin-left: 5px;
  background: ${props =>
    props.round ? `rgba(240, 52, 52, 0.7)` : `rgba(240, 52, 52, 1)`};
  color: white;
  width: 100px;
  border: none;
  border-radius: ${props => (props.round ? "22px" : "2px")};
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  &:hover {
    background: rgba(240, 52, 52, 1);
    transform: translateY(-3px);
    box-shadow: ${props =>
      props.round ? "none" : "4px 3px 12px 0px rgba(0, 0, 0, 0.2)"};
  }
  &:focus {
    background: rgba(240, 52, 52, 1);
    transform: translateY(-3px);
    box-shadow: ${props =>
      props.round ? "none" : "4px 3px 12px 0px rgba(0, 0, 0, 0.2)"};
  }
`;

export const StyledCloseButton = styled.i`
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
  color: white;
  font-size: 30px;
`;

export const StyledLogoutButton = styled.i`
  position: absolute;
  z-index: 200;
  color: rgba(0, 0, 0, 0.2);
  left: 0vw;
  cursor: pointer;
  font-size: 50px;
  transition: color 0.5s ease;
  &:hover {
    color: white;
  }
`;

export const StyledOpenLinkWrapper = styled.a`
  font-size: 30px;
  margin-left: 15px;
  text-decoration: none;
  color: black;
  &:visited {
    color: black;
  }
`;

export const StyledOpenLinkButton = styled.i`
  font-size: 30px;
`;
