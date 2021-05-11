import React from "react";
import PropTypes from "prop-types";

function Images({ setImages }) {
  return (
    <label htmlFor="images">
      <input
        type="file"
        id="images"
        name="images"
        accept="image/*"
        multiple
        onChange={(e) => setImages(e.target.files)}
      />
    </label>
  );
}

export default Images;

Images.propTypes = {
  setImages: PropTypes.func,
};

Images.defaultProps = {
  setImages: () => {},
};
