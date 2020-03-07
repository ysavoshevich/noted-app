import React, { useState, useCallback } from "react";
import "./app.css";

import Media from "react-media";
import { Map } from "immutable";

import { ScreenSizeProvider } from "../../contexts/screen-size-context";
import { AuthProvider } from "../../contexts/auth-context";
import { ServerErrorProvider } from "../../contexts/server-error-context";

import { loginOnRefresh } from "../../util";

import ErrorBoundary from "../error-boundary/error-boundary";
import AuthForm from "../auth-form/auth-form";
import ErrorScreen from "../error-screen/error-screen";
import Section from "../section/section";

function App() {
  const [tokenLS, dataLS] = loginOnRefresh();
  const [serverError, setServerError] = useState(false);
  const [token, setToken] = useState(tokenLS ? tokenLS : null);
  const [data, setData] = useState(
    dataLS
      ? Map(dataLS)
      : Map({
          books: {
            entries: []
          },
          music: {
            entries: []
          },
          movies: {
            entries: []
          },
          articles: {
            entries: []
          }
        })
  );
  return serverError ? (
    <ErrorScreen />
  ) : (
    <ErrorBoundary>
      <div className="App">
        <Media
          queries={{
            small: "(max-width: 699px)",
            medium: "(max-height: 1040px)"
          }}
        >
          {matches => {
            return (
              <ServerErrorProvider setServerError={setServerError}>
                <AuthProvider token={token}>
                  <ScreenSizeProvider matches={matches}>
                    <Section data={data} setData={setData} />
                    {!token && (
                      <AuthForm setToken={setToken} setData={setData} />
                    )}
                  </ScreenSizeProvider>
                </AuthProvider>
              </ServerErrorProvider>
            );
          }}
        </Media>
      </div>
    </ErrorBoundary>
  );
}

export default App;
