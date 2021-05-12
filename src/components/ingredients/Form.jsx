import React, { useState } from "react";
import PropTypes from "prop-types";
import submit from "../../utils/submit";

// If an ingredient is passed, the form will update it.
// Otherwise, a new ingredient document will be created.
function Form({ ingredient }) {
  const [name, setName] = useState((ingredient && ingredient.name) || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name) {
      setError("Name must be specified.");
      return;
    }

    /* Submit the form
    - If successful, return the ingredient details.
    - If login failed, return { errors: [] }
    */

    let res;
    if (!ingredient) {
      res = await submit(`${process.env.REACT_APP_API_URL}/ingredients`, { name });
    } else {
      res = await submit(
        `${process.env.REACT_APP_API_URL}/ingredients/${ingredient._id}`,
        { name },
        "PUT"
      );
    }

    // If there are form errors, display them.
    if (res.errors) {
      setError(res.errors[0]);
    }

    // Ingredient was created.
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <textarea
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      {error && <div>{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Form.defaultProps = {
  ingredient: undefined,
};
