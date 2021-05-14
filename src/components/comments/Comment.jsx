import React, { useState } from "react";
import PropTypes from "prop-types";
import Delete from "./Delete";
import Form from "./Form";

function Comment({ comment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li key={comment._id}>
      <div>{comment.username}</div>
      <div>{comment.content}</div>
      <Delete comment={comment} />
      <button type="button" onClick={() => setIsEditing(!isEditing)}>
        Edit
      </button>
      <button type="button" onClick={() => setIsReplying(!isReplying)}>
        Reply
      </button>
      {isEditing && <Form postId={comment.post} comment={comment} />}
      {comment.children &&
        comment.children.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      {isReplying && <Form postId={comment.post} parentId={comment._id} />}
    </li>
  );
}

export default Comment;

Comment.propTypes = {
  comment: PropTypes.shape({
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
    parent: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.string),
    account: PropTypes.string,
  }).isRequired,
};
