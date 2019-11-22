import React from 'react';
import './Gallery.css'

const imageContext = require.context('../images', true);
const NUM_COLUMNS = 3;

/***************************************************
 * @prop images - string array of images
 * @return two columns containing the images
 */


function getImgSrc(str) {
  return imageContext(`./${str}.jpg`)
}

export default Gallery