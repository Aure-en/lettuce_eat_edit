import React from "react";
import PropTypes from "prop-types";
import Form from "../../components/posts/form/Form";
import Delete from "../../components/posts/Delete";
import useFetch from "../../hooks/useFetch";

function Update({ id }) {
  // Request the data of the post the user wants to update.
  // If the request is successful, data contains the post.
  // Otherwise, error contains "Post not found."
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/posts/${id}`
  );

  return (
    <>
      {data && (
        <>
          <Form post={data} />
          <Delete post={data} />
        </>
      )}
      {error && <div>Post not found.</div>}
    </>
  );
}

export default Update;

Update.propTypes = {
  id: PropTypes.string.isRequired,
};
