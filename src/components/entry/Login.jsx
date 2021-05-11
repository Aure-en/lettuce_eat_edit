import React, { useState } from "react";
import submit from "../../utils/submit";

function Login() {
  const initial = {
    username: "",
    password: "",
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({ ...initial, response: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);
    // Client-side validation
    // Check that all fields are filled.
    Object.keys(values).map((value) => {
      if (!values[value]) {
        setErrors((prev) => {
          return {
            ...prev,
            [value]: `${value} must be specified.`,
          };
        });
      }
    });

    // If there are errors, display them without submitting the form.
    let hasErrors = false;
    for (const field of Object.keys(errors)) {
      if (errors[field]) {
        hasErrors = true;
        break;
      }
    }

    if (hasErrors) return;

    /* Submit the form
    - If login is successful, return { user, token: JWT }
    - If login failed, return { errors: [] }
    */

    const response = await submit(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        username: values.username,
        password: values.password,
      }
    );

    // If there are form errors, display them.
    if (response.errors) {
      response.errors.map((error) =>
        setErrors((prev) => {
          return {
            ...prev,
            [error.param]: error.msg,
          };
        })
      );
    }

    // If the user was logged-in properly, save the token and user information.
    if (response.token) {
      localStorage.setItem("JWTToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
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
          onChange={handleInputChange}
        />
      </label>
      {errors.username && <div>{errors.username}</div>}

      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
      </label>
      {errors.password && <div>{errors.password}</div>}

      {errors.response && <div>{errors.response}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
