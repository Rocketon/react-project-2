import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Посты отсутствую</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>

      {posts.map((post, index) => (
        <PostItem key={post.id} number={index + 1} post={post} remove={remove}></PostItem>
      ))}
    </div>
  );
};

export default PostList;
