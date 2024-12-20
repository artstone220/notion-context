import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        {currentUser ? `Привет, ${currentUser.email}` : "Привет, гость!"}
      </div>
      <div className="header-right">
        <Link to="/home">Главная</Link>
        <Link to="/notes">Заметки</Link>
        <button onClick={handleLogout}>Выход</button>
      </div>
    </header>
  );
};

export default Header;
