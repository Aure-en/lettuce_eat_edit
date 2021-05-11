import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function Posts() {
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/posts`);
  return (
    <ul>
      {data &&
        data.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
    </ul>
  );
}

export default Posts;
