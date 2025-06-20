import NoteCard from "../components/NoteCard";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Controls from "../components/Controls";
import { useRef } from "react";
import { useEffect } from "react";

const NotesPage = () => {

  const {notes,selectedNote,setSelectedNote}=useContext(NoteContext);
  const pageRef=useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isNote = e.target.closest(".card");
      const isControls = e.target.closest("#controls");

      if (!isNote && !isControls && selectedNote) {
        setSelectedNote(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedNote]);
  return (
    <div ref={pageRef}>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
      <Controls />
    </div>
  );
};

export default NotesPage;
