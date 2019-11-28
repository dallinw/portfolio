import React, { useState } from 'react';
import './Image.css'

const images = require.context('../assets/images', true);

const imageNames = ['ube.jpg', 'bitter.jpg', 'jumping.jpg', 'laughing.jpg', 'problem.jpg', 'colorfulgirls.jpg'];

const Image = () => {
  const [imageSrc, setImageSrc] = useState(getDefaultImage());

  function getDefaultImage() {
    var imgName = imageNames[getRandomInt(imageNames.length)]
    var image =  images(`./${imgName}`)
    return image;
  }

  function setImage() {
    var imgName = imageNames[getRandomInt(imageNames.length)]
    var image =  images(`./${imgName}`)
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