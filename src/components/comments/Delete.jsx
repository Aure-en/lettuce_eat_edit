import React from "react";

function Delete({ comment }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/${comment.post}/comments/${comment._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTToken")}`,
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Are you sure you want to delete this comment?</div>
      <div>{comment.username}</div>
      <div>{comment.content}</div>

      <button type="button">Cancel</button>
      <button type="submit">Delete</button>
    </form>
  );
}

export default Delete;
