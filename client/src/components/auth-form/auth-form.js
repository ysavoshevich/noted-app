import React, { useState } from "react";
import axios from "axios";
import { Map } from "immutable";
import * as Sentry from "@sentry/browser";

import { useScreenSize } from "../../contexts/screen-size-context";
import { useServerError } from "../../contexts/server-error-context";

import { emailRegEx, setAutoLogout } from "../../util";
import { StyledAuthForm, StyledFormWrapper } from "./styles";
import { LoginButton, RegisterButton } from "../buttons";
import Input from "../input/input";
import Darkener from "../darkener/darkener";
import { ButtonWrapper, ErrorMessage } from "./styles";
import Logo from "../logo/logo";
import Spinner from "../spinner/spinner";

export default function AuthForm({ setToken, setData }) {
  const [small] = useScreenSize();
  const [setServerError] = useServerError();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [regBtnLoading, setRegBtnLoading] = useState(false);
  const [logBtnLoading, setLogBtnLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const validate = (email, password) => {
    if (email.length === 0 || password.length === 0) {
      setError("Fields should not be empty.");
      return false;
    }
    if (password.length < 6) {
      setError("Password length should be greater than 5 characters.");
      return false;
    }
    if (!emailRegEx.test(email)) {
      setError("Enter a valid email.");
      return false;
    }
    return true;
  };
  const register = async (email, password) => {
    try {
      if (validate(email, password)) {
        setRegBtnLoading(true);
        setDisabled(true);
        const response = await axios.post("/register", {
          email,
          password
        });
        const { token, dataObj } = response.data;
        updateLocalStorage(token, dataObj);
        setRegBtnLoading(false);
        setDisabled(false);
        setToken(token);
        setData(Map(dataObj));
      }
    } catch (error) {
      setRegBtnLoading(false);
      setDisabled(false);
      if (error.response) {
        setError(error.response.data.message);
      }
      if (error.statusCode === 500) {
        Sentry.withScope(scope => {
          Sentry.captureException(error);
        });
        setServerError(true);
      }
    }
  };
  const login = async (email, password) => {
    try {
      if (validate(email, password)) {
        setLogBtnLoading(true);
        setDisabled(true);
        const response = await axios.post("/login", {
          email,
          password
        });
        const { token, dataObj } = response.data;
        updateLocalStorage(token, dataObj);
        setLogBtnLoading(false);
        setDisabled(false);
        setToken(token);
        setData(Map(dataObj));
      }
    } catch (error) {
      setLogBtnLoading(false);
      setDisabled(false);
      if (error.response) {
        setError(error.response.data.message);
      }
      if (error.statusCode === 500) {
        Sentry.withScope(scope => {
          Sentry.captureException(error);
        });
        setServerError(true);
      }
    }
  };
  const updateLocalStorage = (token, dataObj) => {
    localStorage.setItem("token", token);
    localStorage.setItem("dataObj", JSON.stringify(dataObj));
    const remainingMilliseconds = 60 * 60 * 950;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
    setAutoLogout(remainingMilliseconds);
  };
  return (
    <Darkener>
      <StyledFormWrapper small={small ? 1 : 0}>
        <Logo />
        {error && <ErrorMessage children={error} />}
        <StyledAuthForm small={small ? 1 : 0}>
          <Input
            style={{ marginTop: 0, marginBottom: 0 }}
            label="email"
            value={email}
            changeHandler={e => setEmail(e.target.value)}
            placeholder="Enter email..."
          />
          <Input
            style={{ marginTop: 0 }}
            label="password"
            value={password}
            type="password"
            changeHandler={e => setPassword(e.target.value)}
            placeholder="Enter password..."
          />
          <ButtonWrapper>
            <RegisterButton
              disabled={disabled}
              children={regBtnLoading ? <Spinner /> : "Register"}
              onClick={() => register(email, password)}
            />
            <LoginButton
              disabled={disabled}
              children={logBtnLoading ? <Spinner /> : "Log In"}
              onClick={() => login(email, password)}
            />
          </ButtonWrapper>
        </StyledAuthForm>
      </StyledFormWrapper>
    </Darkener>
  );
}
