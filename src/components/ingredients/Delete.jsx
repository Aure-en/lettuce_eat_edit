import React from "react";
import PropTypes from "prop-types";

function Delete({ ingredient }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/ingredients/${ingredient._id}`,
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
      <div>Are you sure you want to delete this ingredient?</div>
      <div>{ingredient.name}</div>
      <div>
        The ingredient will be removed from all posts' ingredient lists that
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
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
