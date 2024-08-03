import { useEffect,useRef,useState } from 'react'
import React from 'react'
import Trash from '../icons/Trash'
import { setNewOffset, autoGrow, setZindex } from '../utils'

const NoteCard = ({note}) => {

    const body=JSON.parse(note.body)
    const [position,setPosition] =useState(JSON.parse(note.position))
    const colors=JSON.parse(note.colors)

    const textAreaRef=useRef(null)

    let mouseStartPosition={x:0,y:0}
    const cardRef=useRef(null)

   useEffect(() => {
     autoGrow(textAreaRef);
   }, []);

 
   const mouseDown=(e)=>{
    mouseStartPosition.x=e.clientX;
    mouseStartPosition.y=e.clientY;

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup',mouseUp)

    setZindex(cardRef.current)
   }

   const mouseMove=(e)=>{
    const mouseMoveDirection = {
      //calculating mouse positions
      x: mouseStartPosition.x - e.clientX,
      y: mouseStartPosition.y - e.clientY
    }

     //resetting the mouse positions
       mouseStartPosition.x = e.clientX;
       mouseStartPosition.y = e.clientY;
       
       const newPosition=setNewOffset(cardRef.current, mouseMoveDirection)
       setPosition(newPosition)

   }


   const mouseUp=(e)=>{
    document.removeEventListener("mousemove",mouseMove)
    document.removeEventListener("mouseup",mouseUp)
   }
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
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={()=>{
            setZindex(cardRef.current)
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default NoteCard