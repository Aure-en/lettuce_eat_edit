import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Form from "../../components/posts/Form";

function Posts({ match }) {
  return (
    <Switch>
      <Route exact path={`${match.path}/create`} component={Form} />
    </Switch>
  );
}

export default Posts;

Posts.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};
