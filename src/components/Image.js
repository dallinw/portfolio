import React, { useEffect, useState } from 'react';
import './Image.css';

const Image = ({ images }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    function getDefaultImage() {
      if (images) {
        let values = Array.from(Object.values(images));
        setImageSrc(values[Math.floor(Math.random() * values.length)]);
      }
    }

    getDefaultImage();
  }, [images]);

  function setImage() {
    if (!images) {
      return null;
    }
    let values = Array.from(Object.values(images));
    let image = values[Math.floor(Math.random() * values.length)];
    if (image !== imageSrc) setImageSrc(image);
    else setImage();
  }

  return (
    <img
      onClick={() => setImage()}
      className='img'
      src={imageSrc && imageSrc.src}
      alt=''
    ></img>
  );
};

export default Image;
