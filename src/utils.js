export const setNewOffset=(card, mouseMoveDirection={x:0,y:0})=>{
    const offsetLeft=card.offsetLeft-mouseMoveDirection.x;
    const offsetTop = card.offsetTop-mouseMoveDirection.y;

    return{
        x:offsetLeft <0? 0: offsetLeft,
        y:offsetTop <0? 0:offsetTop

    }

}

 export function autoGrow(textAreaRef) {
   const { current } = textAreaRef;
   current.style.height = "auto"; // Reset the height
   current.style.height = current.scrollHeight + "px"; // Set the new height
}

export const setZindex=(selectedCard) => {
    selectedCard.style.zIndex=999; //higher z index so at top

    Array.from(document.getElementsByClassName("card")).forEach((card)=>{
        if(card !== selectedCard){
            card.style.zIndex=selectedCard.style.zIndex-1;  // every other card will have a z index of 998 and selected will have of 999 so it will be om top
            
        }
    })

}