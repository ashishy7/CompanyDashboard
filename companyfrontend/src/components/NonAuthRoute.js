import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../util/AuthHandler";

function NonAuthRoute({ children, ...rest }) {
  const isAuthenticated = auth.isAuthenticated();
  return (
    <Route render={() => (!isAuthenticated ? children : <Redirect to="/" />)} />
  );
}

export default NonAuthRoute;
