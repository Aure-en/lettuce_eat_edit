import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

function Ingredient({ setIngredient }) {
  const [checked, setChecked] = useState([]);
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/ingredients`);

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setChecked((prev) => {
        const current = [...prev];
        current.push(e.target.value);
        return current;
      });
    } else {
      setChecked((prev) =>
        [...prev].filter((ingredient) => ingredient !== e.target.value)
      );
    }
  };

  useEffect(() => {
    setIngredient(checked);
  }, [checked]);

  return (
    <>
      {data && (
        <>
          {data.map((ingredient) => (
            <label htmlFor={ingredient._id} key={ingredient._id}>
              {ingredient.name}
              <input
                type="checkbox"
                id={ingredient._id}
                name={ingredient._id}
                value={ingredient._id}
                onChange={handleCheckbox}
              />
            </label>
          ))}
        </>
      )}
    </>
  );
}

export default Ingredient;

Ingredient.propTypes = {
  setIngredient: PropTypes.func,
};

Ingredient.defaultProps = {
  setIngredient: () => {},
};
