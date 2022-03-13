import React from "react";
import { Redirect, Route } from "react-router";
import PropTypes from "prop-types";

export const PublicRoute = ({ dataPlayers, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        dataPlayers === 0 ? <Component {...props} /> : <Redirect to="/tema" />
      }
    />
  );
};

PublicRoute.prototype = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
