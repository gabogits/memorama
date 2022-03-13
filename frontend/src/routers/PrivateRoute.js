import React from "react";
import { Redirect, Route } from "react-router";
import PropTypes from "prop-types";

export const PrivateRoute = ({
  dataPlayers,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        dataPlayers > 0 ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.prototype = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
