import React, { useState } from "react";
import PropTypes from "prop-types";
import submit from "../../utils/submit";

// If a comment is passed, the form will update it.
// Otherwise, a new comment document will be created.
function Form({ postId, parentId, comment }) {
  const [values, setValues] = useState({
    username: (comment && comment.username) || "",
    content: (comment && comment.content) || "",
  });

  const [errors, setErrors] = useState({
    username: "",
    content: "",
  });

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      username: "",
      content: "",
    });

    // Client-side validation
    let hasErrors = false;
    Object.keys(values).map((key) => {
      if (!values[key]) {
        hasErrors = true;
        setErrors((prev) => {
          return {
            ...prev,
            [key]: `${key} must be specified.`,
          };
        });
      }
    });

    if (hasErrors) return;

    // Send form to back
    let res;

    // Updating a comment
    if (comment) {
      res = await submit(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${comment._id}`,
        values,
        "PUT"
      );
    } else {
      res = await submit(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${
          parentId ? `${parentId}` : ""
        }`,
        values
      );
    }
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
      </label>
      {errors.username && <div>{errors.username}</div>}

      <label htmlFor="content">
        Comment
        <textarea
          id="content"
          name="content"
          value={values.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </label>
      {errors.content && <div>{errors.content}</div>}

      <button type="submit">Comment</button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  postId: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  comment: PropTypes.shape({
    username: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Form.defaultProps = {
  parentId: undefined,
  comment: undefined,
};
