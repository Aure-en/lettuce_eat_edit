import React, { useState } from "react";
import styled from "styled-components";
import Category from "./Category";
import Ingredient from "./Ingredient";
import Published from "./Published";
import Images from "./Images";

function Form() {
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

  const [values, setValues] = useState(initialValues);
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
      setErrors((prev) => {
        hasErrors = true;
        return {
          ...prev,
          title: "Text must be specified.",
        };
      });
    }

    if (hasErrors) return;

    // Create FormData object to be able to send multipart/form-data content.
    const formData = new FormData();
    Object.keys(values).map((key) => {
      if (key !== "images") formData.append(key, values[key]);
    });

    for (let i = 0; i < values.images.length; i += 1) {
      formData.append("images", values.images[i]);
    }

    // Submit the form
    const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
      }),
      body: formData,
    });
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
      <Images setImages={(value) => handleChange("images", value)} />
      <Category setCategory={(value) => handleChange("category", value)} />
      <Ingredient
        setIngredient={(value) => handleChange("ingredient", value)}
      />
      <Published setPublished={(value) => handleChange("published", value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
