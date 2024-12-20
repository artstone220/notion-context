import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ViewNote.scss";

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    console.log("Все заметки:", notes);
    console.log("Текущий пользователь:", currentUser);

    const foundNote = notes.find(
      (note) => note.id === parseInt(id) && note.userId === currentUser.id
    );

    if (foundNote) {
      setNote(foundNote);
    } else {
      setError(true);
    }
  }, [id, currentUser]);

  const handleDelete = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const noteToDelete = notes.find((note) => note.id === parseInt(id));

    if (!noteToDelete) {
      alert("Заметка не найдена.");
      return;
    }

    const updatedNotes = notes.filter((note) => note.id !== parseInt(id));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/notes");
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Заметка не найдена или у вас нет доступа к ней.</h2>
        <button onClick={() => navigate("/notes")} className="action-button">
          Вернуться к заметкам
        </button>
      </div>
    );
  }

  if (!note) return null;
  return (
    <div className="notes-container">
      <div className="header">
        <h1>Просмотр заметки</h1>
        <div className="button-container">
          <button onClick={() => navigate(-1)} className="action-button">
            Назад
          </button>
          <Link to={`/edit-note/${note.id}`} className="action-button">
            Редактировать
          </Link>
          <button
            onClick={handleDelete}
            className="action-button delete-button"
          >
            Удалить
          </button>
        </div>
      </div>
      <h2 className="note-title">{note.title}</h2>
      <p className="note-description">{note.content}</p>
    </div>
  );
};

export default ViewNote;
