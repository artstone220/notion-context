import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notes.scss";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert("Пожалуйста, заполните заголовок");
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      content,
      creationDate: new Date().toISOString(),
      userId: currentUser.id,
    };

    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = [...existingNotes, newNote];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    navigate("/notes");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="notes-container">
      <div className="header">
        <h1>Создать новую заметку</h1>
        <button onClick={handleBack} className="back-button">
          Назад
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название заметки"
            required
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Введите содержимое заметки (необязательно)"
          />
        </div>
        <button type="submit" className="create-button">
          Создать заметку
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
