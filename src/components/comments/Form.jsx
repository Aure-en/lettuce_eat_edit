import React, { useState } from "react";
import PropTypes from "prop-types";

function Form({ postId, parentId }) {
  const [values, setValues] = useState({
    username: "",
    content: "",
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
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${
        parentId ? `${parentId}` : ""
      }`,
      {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          username: values.username,
          content: values.content,
        }),
      }
    );
    const json = await res.json();
    console.log(json);
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

      <label htmlFor="content">
        Comment
        <textarea
          id="content"
          name="content"
          value={values.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </label>

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
