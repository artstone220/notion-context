import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleNavigateToNotes = () => {
    navigate("/notes");
  };

  return (
    <div className="home-container">
      <h1>Добро пожаловать!</h1>
      {currentUser ? (
        <div className="user-info-container">
          <div className="user-info">
            <span className="label">Почта:</span>
            <span className="value">{currentUser.email}</span>
          </div>
          <div className="user-info">
            <span className="label">Дата:</span>
            <span className="value">
              {new Date(currentUser.creationDate).toLocaleString()}
            </span>
          </div>
          <button onClick={handleNavigateToNotes}>Перейти к заметкам</button>
        </div>
      ) : (
        <p>Пользователь не найден. Пожалуйста, зарегистрируйтесь.</p>
      )}
    </div>
  );
};

export default Home;
