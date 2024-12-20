import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Неверный email или пароль");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    console.log("Вход выполнен для:", { email });
    navigate("/home");
  };

  return (
    <div className="login-container">
      <h1>Вход</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            name="password"
            autoComplete="current-password"
            placeholder="Пароль"
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p className="registration-prompt">
        <button onClick={() => navigate("/")}>Еще не зарегистрированы?</button>
      </p>
    </div>
  );
};

export default Login;
