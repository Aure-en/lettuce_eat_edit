import React from "react";
import PropTypes from "prop-types";
import Form from "../../components/categories/Form";
import Delete from "../../components/categories/Delete";
import useFetch from "../../hooks/useFetch";

function Update({ id }) {
  // Request the data of the post the user wants to update.
  // If the request is successful, data contains the post.
  // Otherwise, error contains "Post not found."
  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/categories/${id}`
  );

  return (
    <>
      {data && (
        <>
          <Form category={data} />
          <Delete category={data} />
        </>
      )}
      {error && <div>Category not found.</div>}
    </>
  );
}

export default Update;

Update.propTypes = {
  id: PropTypes.string.isRequired,
};
