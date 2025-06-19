import React from 'react'

const Color = ({color}) => {
    const chnageColor = () => {
       console.log("Color changed to:", color);
    }
  return (
    <div style={{backgroundColor:color.colorHeader}} className='color' onClick={chnageColor}>

    </div>
  )
}

export default Color