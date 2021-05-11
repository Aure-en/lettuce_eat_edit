import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Ingredients() {
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/ingredients`);
  return (
    <ul>
      {data &&
        data.map((ingredient) => (
          <li key={ingredient._id}>
            <Link to={`/ingredients/${ingredient._id}`}>{ingredient.name}</Link>
          </li>
        ))}
    </ul>
  );
}

export default Ingredients;
