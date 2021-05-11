import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Category from "./Category";
import Ingredient from "./Ingredient";
import Published from "./Published";
import Images from "./Images";

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
    let res;
    if (!post) {
      res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
        }),
        body: formData,
      });
    } else {
      res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${post._id}`, {
        method: "PUT",
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
        }),
        body: formData,
      });
    }
    console.log(await res.json());
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
