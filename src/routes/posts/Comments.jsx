import React from "react";
import PropTypes from "prop-types";
import List from "../../components/comments/List";
import Form from "../../components/comments/Form";
import useFetch from "../../hooks/useFetch";

function Comments({ id }) {
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts/${id}/comments`
  );

  return (
    <>
      <Form postId={id} />
      {data && <List comments={data} />}
      {error && <div>There are no comments here.</div>}
    </>
  );
}

export default Comments;

Comments.propTypes = {
  id: PropTypes.string.isRequired,
};
