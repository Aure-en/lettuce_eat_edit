import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Create from "./Create";

function Categories({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.path}/create`} component={Create} />
    </Switch>
  );
}

export default Categories;

Categories.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};
