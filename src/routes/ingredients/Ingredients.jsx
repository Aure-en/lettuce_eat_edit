import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Create from "./Create";

function Ingredients({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.path}/create`} component={Create} />
    </Switch>
  );
}

export default Ingredients;

Ingredients.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};
