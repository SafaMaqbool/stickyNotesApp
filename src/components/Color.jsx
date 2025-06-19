import React from 'react'
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { db } from '../appwrite/databases';
const Color = ({color}) => {
    const { selectedNote ,notes,setNotes} = useContext(NoteContext);
    const changeColor = () => {
      console.log("Selected color:", selectedNote);

      try {
        const currentNoteIndex = notes.findIndex(
          (note) => note.$id === selectedNote.$id
        );

        const updatedNote = {
          ...notes[currentNoteIndex],
          color: JSON.stringify(color),
        };

        const newNotes = [...notes];
        newNotes[currentNoteIndex] = updatedNote;
        setNotes(newNotes);

        db.notes.update(selectedNote.$id, {
          color: JSON.stringify(color),
        });
      } catch (error) {
        alert("You must select a note before changing colors");
      }
    };
  return (
    <div style={{backgroundColor:color.colorHeader}} className='color' onClick={changeColor}>

    </div>
  )
}

export default Color