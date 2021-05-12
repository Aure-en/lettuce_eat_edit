import React from "react";
import Delete from "./Delete"

function List({ comments }) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>
          <div>{comment.username}</div>
          <div>{comment.content}</div>
          <Delete comment={comment} />
        </li>
      ))}
    </ul>
  );
}

export default List;
