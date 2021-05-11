import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Form from "../components/ingredients/Form";

function Ingredients({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.path}/create`} component={Form} />
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
