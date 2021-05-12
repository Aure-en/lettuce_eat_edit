import React from "react";
import PropTypes from "prop-types";

function Delete({ post }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${post._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
        },
      }
    );
  };

  return (
    <div>
      <div>Are you sure you want to delete this post?</div>
      <div>{post.title}</div>

      <button type="button">Cancel</button>
      <form onSubmit={handleSubmit}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default Delete;

Delete.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
