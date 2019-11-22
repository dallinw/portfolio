import React, { useState } from 'react';
import './Image.css'

const images = require.context('../images', true);

const imageNames = ['carrot', 'dragonfruit', 'ube', 'bitter', 'eggplant', 'chili', 'papaya'];

const Image = () => {
  const [imageSrc, setImageSrc] = useState(getDefaultImage());

  function getDefaultImage() {
    var imgName = imageNames[getRandomInt(imageNames.length)]
    var image =  images(`./${imgName}.jpg`)
    return image;
  }

  function setImage() {
    var imgName = imageNames[getRandomInt(imageNames.length)]
    var image =  images(`./${imgName}.jpg`)
    if(image !== imageSrc) setImageSrc(image);
    else setImage();
  }
  
  return (
      <img onClick={()=>setImage()} className="img" src={imageSrc} alt=""></img>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Image