import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

function Category({ setCategory }) {
  const [checked, setChecked] = useState([]);
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/categories`);

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setChecked((prev) => {
        const current = [...prev];
        current.push(e.target.value);
        return current;
      });
    } else {
      setChecked((prev) =>
        [...prev].filter((category) => category !== e.target.value)
      );
    }
  };

  useEffect(() => {
    setCategory(checked);
  }, [checked]);

  return (
    <>
      {data && (
        <>
          {data.map((category) => (
            <label htmlFor={category._id} key={category._id}>
              {category.name}
              <input
                type="checkbox"
                id={category._id}
                name={category._id}
                value={category._id}
                onChange={handleCheckbox}
              />
            </label>
          ))}
        </>
      )}
    </>
  );
}

export default Category;

Category.propTypes = {
  setCategory: PropTypes.func,
};

Category.defaultProps = {
  setCategory: () => {},
};
