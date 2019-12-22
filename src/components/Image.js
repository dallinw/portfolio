import React, { useState } from 'react';
import './Image.css'

const images = require.context('../assets/images', true);

const imageNames = ['home page - destroyer.png', 'home page - falling girls.png', 'home page - fight.png', 'home page - lawn.png', 'home page - the cow said.png', 'home page - toy.png',];

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