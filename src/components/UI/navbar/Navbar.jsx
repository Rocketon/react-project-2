import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context";
function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = (e) => {
    e.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <div className="navbar">
      <div className="navbar__links">
        {isAuth ? (
          <Link to="/login" style={{ color: "red" }} onClick={logout}>
            Вы авторизованы {"(выйти)"}
          </Link>
        ) : (
          <Link to="/login">Авторизация</Link>
        )}
        <Link to="/about">О сайте</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
}

export default Navbar;
