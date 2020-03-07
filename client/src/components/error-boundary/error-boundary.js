import React from "react";
import * as Sentry from "@sentry/browser";
import Darkener from "../darkener/darkener";
import ErrorScreen from "../error-screen/error-screen";

class ErrorBoundary extends React.Component {
  state = {
    showError: false
  };
  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
      this.setState({
        showError: true
      });
    });
  }
  render() {
    if (this.state.showError) {
      return (
        <Darkener style={{ zIndex: 3000 }}>
          <ErrorScreen />
        </Darkener>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
