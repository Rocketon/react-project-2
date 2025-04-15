import About from "../../pages/About";
import Login from "../../pages/Login";
import PostPage from "../../pages/PostPage";
import Posts from "../../pages/Posts";
import Error from "../../pages/Error";

export const privateRoutes = [
  { path: "/", element: <Posts /> },
  { path: "/about", element: <About /> },
  { path: "/posts", element: <Posts /> },
  { path: "/posts/:id", element: <PostPage /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <Error /> },
];

export const publicRoutes = [
  { path: "*", element: <Login /> },
  { path: "/login", element: <Login /> },
];
