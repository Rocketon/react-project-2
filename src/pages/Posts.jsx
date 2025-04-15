import React, { useEffect, useRef, useState } from "react";
import PostList from "./../components/PostList";
import PostForm from "./../components/PostForm";
import PostFilter from "./../components/PostFilter";
import MyModal from "./../components/UI/modal/MyModal";
import MyButton from "./../components/UI/button/MyButton";
import { usePosts } from "./../hooks/usePosts";
import PostService from "./../API/PostService";
import Loader from "./../components/UI/loader/Loader";
import { useFetching } from "./../hooks/useFetching";
import { getPageCount } from "./../utils/pages";
import Pagination from "./../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [limit, page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (p) => {
    setPage(p);
    fetchPosts(limit, p);
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(!modal)}>
        Написать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во постов"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 15, name: "15" },
          { value: -1, name: "Все" },
        ]}
      ></MySelect>
      {postError && <h1>Произошла ошибка {postError}</h1>}
      <PostList posts={sortedAndSearchedPosts} title={"Посты"} remove={removePost} />
      <div ref={lastElement} style={{ height: 20, background: "grey" }}></div>
      {isPostsLoading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <Loader />
        </div>
      )}
      <Pagination totalPages={totalPages} page={page} changePage={changePage}></Pagination>
    </div>
  );
}

export default Posts;
