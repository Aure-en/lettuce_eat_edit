import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Category from "./Category";
import Ingredient from "./Ingredient";
import Published from "./Published";
import Images from "./Images";

// If a post is passed, the form will update it.
// Otherwise, a new post document will be created.
function Form({ post }) {
  const initialValues = {
    title: "",
    text: "",
    images: [],
    ingredient: [],
    category: [],
    published: true,
  };

  const initialErrors = {
    title: "",
    text: "",
  };

  const [values, setValues] = useState(post || initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initialErrors);

    // Client-side validation
    let hasErrors = false;
    if (!values.title) {
      hasErrors = true;
      setErrors((prev) => {
        return {
          ...prev,
          title: "Title must be specified.",
        };
      });
    }

    if (!values.text) {
      hasErrors = true;
      setErrors((prev) => {
        return {
          ...prev,
          text: "Text must be specified.",
        };
      });
    }

    if (hasErrors) return;

    // Create FormData object to be able to send multipart/form-data content.
    const formData = new FormData();
    // Append string values to formData
    Object.keys(values).map((key) => {
      if (key !== "images" && key !== "ingredient" && key !== "category")
        formData.append(key, values[key]);
    });

    // Append arrays values to formData
    for (let i = 0; i < values.ingredient.length; i += 1) {
      formData.append("ingredient", values.ingredient[i]);
    }

    for (let i = 0; i < values.category.length; i += 1) {
      formData.append("category", values.category[i]);
    }

    for (let i = 0; i < values.images.length; i += 1) {
      formData.append("images", values.images[i]);
    }

    // Submit the form
    // If there is a post, we update it, otherwise, we create a document.
    let res = {};
    res = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${post ? post._id : ""}`,
      {
        method: post ? "PUT" : "POST",
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
        }),
        body: formData,
      }
    );
    const json = await res.json();

    // If there are errors, display them.
    if (json.errors) {
      json.errors.map((error) => {
        setErrors((prev) => {
          return {
            ...prev,
            [error.param]: error.msg,
          };
        });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </label>
      {errors.title && <div>{errors.title}</div>}

      <label htmlFor="text">
        Text
        <textarea
          id="text"
          name="text"
          value={values.text}
          onChange={(e) => handleChange("text", e.target.value)}
        />
      </label>
      {errors.text && <div>{errors.text}</div>}
      <Images
        images={values.images}
        setImages={(value) => handleChange("images", value)}
      />
      <Category
        categories={values.category}
        setCategory={(value) => handleChange("category", value)}
      />
      <Ingredient
        ingredients={values.ingredient}
        setIngredient={(value) => handleChange("ingredient", value)}
      />
      <Published
        published={values.published}
        setPublished={(value) => handleChange("published", value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.shape({
      username: PropTypes.string,
      _id: PropTypes.string,
    }),
    title: PropTypes.string,
    text: PropTypes.string,
    timestamp: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.string),
    ingredient: PropTypes.arrayOf(PropTypes.string),
    published: PropTypes.bool,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        contentType: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
        }),
        name: PropTypes.string,
        _id: PropTypes.string,
      })
    ),
    _id: PropTypes.string,
  }),
};

Form.defaultProps = {
  post: undefined,
};
