import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Create from "./Create";
import List from "./List";
import Update from "./Update";

function Ingredients({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.path}/create`} component={Create} />
      <Route
        exact
        path={`${match.path}/:id`}
        render={({ match }) => <Update id={match.params.id} />}
      />
      <Route exact path={match.path} component={List} />
    </Switch>
  );
}

export default Ingredients;

Ingredients.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
