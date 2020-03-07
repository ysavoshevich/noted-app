import React from "react";
import {
  StyledAddButton,
  StyledSaveAndCloseButton,
  StyledIconButton,
  StyledSaveButton,
  StyledCancelButton,
  StyledRegisterButton,
  StyledLoginButton,
  StyledCloseButton,
  StyledLogoutButton,
  StyledOpenLinkWrapper,
  StyledOpenLinkButton
} from "./styles";

const forwardProps = (Component, props) => {
  return <Component {...props} />;
};

export const AddButton = props => forwardProps(StyledAddButton, props);
export const SaveAndCloseButton = props =>
  forwardProps(StyledSaveAndCloseButton, props);
export const EditButton = props =>
  forwardProps(StyledIconButton, {
    ...props,
    className: "fas fa-pencil-alt"
  });
export const DeleteButton = props =>
  forwardProps(StyledIconButton, {
    ...props,
    className: "fas fa-trash-alt"
  });
export const SaveButton = props => forwardProps(StyledSaveButton, props);
export const CancelButton = props => forwardProps(StyledCancelButton, props);
export const RegisterButton = props =>
  forwardProps(StyledRegisterButton, props);
export const LoginButton = props => forwardProps(StyledLoginButton, props);
export const CloseButton = props =>
  forwardProps(StyledCloseButton, { ...props, className: "fas fa-times" });
export const LogoutButton = props =>
  forwardProps(StyledLogoutButton, {
    ...props,
    className: "fas fa-sign-out-alt"
  });
export const OpenLinkButton = props =>
  forwardProps(StyledOpenLinkWrapper, {
    ...props,
    children: <StyledOpenLinkButton />,
    className: "fas fa-external-link-alt"
  });
