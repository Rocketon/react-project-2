import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import { privateRoutes, publicRoutes } from "./router/router";
import { AuthContext } from "./context";

function AppRouter() {
  const {isAuth, setIsAuth} = useContext(AuthContext)
  return (
    <div>
      {isAuth ? (
        
        <Routes>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      )}
    </div>
  );
}

export default AppRouter;
