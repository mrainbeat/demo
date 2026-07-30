import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const { user } = useContext(AppContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
