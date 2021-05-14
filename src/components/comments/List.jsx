import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

function List({ comments }) {
  return (
    <ul>
      {comments.map((comment) => {
        if (!comment.parent) {
          return <Comment comment={comment} key={comment._id} />;
        }
      })}
    </ul>
  );
}

export default List;

List.propTypes = {
  comments: PropTypes.arrayOf({
    comment: PropTypes.shape({
      username: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
