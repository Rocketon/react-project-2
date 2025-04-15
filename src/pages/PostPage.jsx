import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>Пост №{params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>{post.title}</h2>
          <span>Written by user #{post.userId}</span>
          <p>{post.body}</p>
        </div>
      )}
      {isComLoading ? (
        <Loader />
      ) : (
        <div style={{marginTop: 30}}>
          <h4>Комментарии к посту {`(${comments.length})`}:</h4>
          {comments.map((comm) => 
            <div key={comm.id} style={{marginTop: 15}}>
              <h5>{comm.email}</h5>
              <p>{comm.body}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostPage;
