import React from "react";
import PropTypes from "prop-types";

function Published({ published, setPublished }) {
  return (
    <select
      name="published"
      id="published"
      onChange={(e) => setPublished(e.target.value === "true")}
      value={published}
    >
      <option value>Public</option>
      <option value={false}>Private</option>
    </select>
  );
}

export default Published;

Published.propTypes = {
  published: PropTypes.bool,
  setPublished: PropTypes.func,
};

Published.defaultProps = {
  published: true,
  setPublished: () => {},
};
