import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div>
      <h1>Выход</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Logout;
