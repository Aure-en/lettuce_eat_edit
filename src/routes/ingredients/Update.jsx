import React from "react";
import PropTypes from "prop-types";
import Form from "../../components/ingredients/Form";
import Delete from "../../components/ingredients/Delete";
import useFetch from "../../hooks/useFetch";

function Update({ id }) {
  // Request the data of the post the user wants to update.
  // If the request is successful, data contains the ingredient.
  // Otherwise, error contains "Ingredient not found."

  const { data, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/ingredients/${id}`
  );
  return (
    <>
      {data && (
        <>
          <Form ingredient={data} />
          <Delete ingredient={data} />
        </>
      )}
      {error && <div>Ingredient not found.</div>}
    </>
  );
}

export default Update;

Update.propTypes = {
  id: PropTypes.string.isRequired,
};
