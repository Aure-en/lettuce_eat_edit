import React from "react";
import PropTypes from "prop-types";

function Delete({ category }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/categories/${category._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
        },
      }
    );
    console.log(await res.json());
  };

  return (
    <div>
      <div>Are you sure you want to delete this category?</div>
      <div>{category.name}</div>
      <div>
        The category will be removed from all posts' category lists that
        contain it.
      </div>

      <button type="button">Cancel</button>
      <form onSubmit={handleSubmit}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default Delete;

Delete.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
