import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Notes.scss";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const foundNote = notes.find((note) => note.id === parseInt(id));

    if (foundNote) {
      setNote(foundNote);
    } else {
      alert("Заметка не найдена");
      navigate("/notes");
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedNote = {
      ...note,
      title: note.title,
      content: note.content,
    };

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = notes.map((n) =>
      n.id === parseInt(id) ? updatedNote : n
    );

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/notes");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="notes-container">
      <div className="header">
        <h1>Редактировать заметку</h1>
        <button onClick={handleBack} className="back-button">
          Назад
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Введите название заметки"
            className="note-input"
            required
          />
        </div>
        <div>
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
            placeholder="Введите содержимое заметки (необязательно)"
            className="note-textarea"
          />
        </div>
        <button type="submit" className="create-button">
          {" "}
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default EditNote;
