import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router";
import Navbar from "./components/UI/navbar/Navbar";
import "./styles/App.css";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./components/context";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <BrowserRouter basename="/react-training_1/">
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
