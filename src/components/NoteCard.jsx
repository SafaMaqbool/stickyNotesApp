import { useEffect, useRef, useState } from "react";

import Trash from "../icons/Trash";
import { setNewOffset, autoGrow, setZindex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
const NoteCard = ({ note }) => {
  const [saving, setSaving] = useState(false);

  const [position, setPosition] = useState(bodyParser(note.position));
  const body = note.body;
  const colors = JSON.parse(note.color);
  const keyUpTimer = useRef(null);
  const textAreaRef = useRef(null);

  let mouseStartPosition = { x: 0, y: 0 };
  const cardRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const mouseDown = (e) => {
    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    setZindex(cardRef.current);
  };

  const mouseMove = (e) => {
    const mouseMoveDirection = {
      //calculating mouse positions
      x: mouseStartPosition.x - e.clientX,
      y: mouseStartPosition.y - e.clientY,
    };

    //resetting the mouse positions
    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDirection);
    setPosition(newPosition);
  };

  const mouseUp = (e) => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
    // db.notes.update(note.$id,{'position': JSON.stringify(newPosition)});
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };

    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error("Error saving data:", error);
    }
    setSaving(false);
  };

  const handleKeyUp = async () => {
    //1 - Initiate "saving" state
    setSaving(true);

    //2 - If we have a timer id, clear it so we can add another two seconds
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    //3 - Set timer to trigger save in 2 seconds
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText}/>
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZindex(cardRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
