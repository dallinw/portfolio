import React, { useState } from 'react';
import './Name.css'

const colors = ['#000000', '#CF396B', '#3D288D', '#9E5461', '#3BD55C', '#E2E65B'];

const Name = () => {
  const [count, setCount] = useState(0);
  return (
      <button className="name" onClick={() => changeColor()} style={{color: colors[count]}}>Mikaella Antonio</button>
  )
  function changeColor() {
    setCount(count+1);
    if(count === colors.length-1) setCount(0);
  }
}

// function changeColor() {
//    setCount(count+1);
//    if(count == colors.length) setCount(0);
// }

export default Name