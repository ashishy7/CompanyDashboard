import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../util/AuthHandler";

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = auth.isAuthenticated();
  return (
    <Route
      render={() => (isAuthenticated ? children : <Redirect to="/login" />)}
    />
  );
}

export default PrivateRoute;
