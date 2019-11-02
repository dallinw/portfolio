import React from 'react';
import './Image.css'

const images = require.context('../images', true);

const imageNames = ['carrot', 'dragonfruit', 'ube'];

const Image = () => {
  var imgName = imageNames[getRandomInt(imageNames.length)]
  let imageSrc = images(`./${imgName}.jpg`);
  return (
      <img className="img" src={imageSrc} alt=""></img>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Image