import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Categories() {
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/categories`);
  return (
    <ul>
      {data &&
        data.map((category) => (
          <li key={category._id}>
            <Link to={`/categories/${category._id}`}>{category.name}</Link>
          </li>
        ))}
    </ul>
  );
}

export default Categories;
