import React from "react";

function Published({ setPublished }) {
  return (
    <select
      name="published"
      id="published"
      onChange={(e) => setPublished(e.target.value)}
    >
      <option value>Public</option>
      <option value={false}>Private</option>
    </select>
  );
}

export default Published;
