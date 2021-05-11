import React, { useState } from "react";
import submit from "../../utils/submit";

function Form() {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!category) {
      setError("Name must be specified.");
      return;
    }

    /* Submit the form
    - If successful, return the category details.
    - If login failed, return { errors: [] }
    */
    const response = await submit(
      `${process.env.REACT_APP_API_URL}/categories`,
      { name: category }
    );

    // If there are form errors, display them.
    if (response.errors) {
      setError(response.errors[0]);
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      {error && <div>{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
