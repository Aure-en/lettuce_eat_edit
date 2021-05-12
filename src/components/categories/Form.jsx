import React, { useState } from "react";
import PropTypes from "prop-types";
import submit from "../../utils/submit";

// If a category is passed, the form will update it.
// Otherwise, a new category document will be created.
function Form({ category }) {
  const [name, setName] = useState((category && category.name) || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name) {
      setError("Name must be specified.");
      return;
    }

    /* Submit the form
    - If successful, return the category details.
    - If login failed, return { errors: [] }
    */
    let res;
    if (!category) {
      res = await submit(`${process.env.REACT_APP_API_URL}/categories`, {
        name,
      });
    } else {
      res = await submit(
        `${process.env.REACT_APP_API_URL}/categories/${category._id}`,
        { name },
        "PUT"
      );
    }

    // If there are form errors, display them.
    if (res.errors) {
      setError(res.errors[0]);
    }

    // Category was created.
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
  category: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Form.defaultProps = {
  category: undefined,
};
