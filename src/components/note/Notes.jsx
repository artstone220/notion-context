import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notes.scss";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find(
    (user) =>
      user.email === JSON.parse(localStorage.getItem("currentUser")).email
  );
  const navigate = useNavigate();

  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredNotes = userNotes.filter(
      (note) => note.userId === currentUser.id
    );
    setNotes(
      filteredNotes.sort(
        (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
      )
    );
  }, [currentUser]);

  const handleAddNote = () => {
    navigate("/create-note");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    const allNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const newAllNotes = allNotes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(newAllNotes));
  };

  return (
    <div className="notes-container">
      <h1>Заметки</h1>
      <div className="button-container">
        <button className="add-note-button" onClick={handleAddNote}>
          Добавить заметку
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <div className="note-content">
              <h2 className="note-title">
                <Link to={`/notes/${note.id}`}>{note.title}</Link>
              </h2>
              <p className="note-description">{note.content}</p>
              <div className="note-meta">
                <p className="creation-date">
                  {new Date(note.creationDate).toLocaleDateString()}
                </p>
                <div className="note-actions">
                  <Link to={`/edit-note/${note.id}`} className="edit-link">
                    ✍️
                  </Link>
                  <span
                    className="delete-icon"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    🗑
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
