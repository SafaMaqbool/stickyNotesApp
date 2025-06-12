import { React, useState, useEffect } from "react";
// import { fakeData as notes } from "../assets/fakeData";

import NoteCard from "../components/NoteCard";
import { db } from "../appwrite/databases";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();
    console.log(response);
    setNotes(response.documents);
  };

  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
};

export default NotesPage;
