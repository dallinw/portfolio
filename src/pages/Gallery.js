import React, { useState, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import BigImage from '../components/BigImage';
import './Gallery.css';

/**************************************************
 * Constants
 *************************************************/

//classnames for responsiveness and show/hide
const BASE_CLASSNAME = 'collectionButton';
const BOLD_CLASSNAME = 'collectionButton bold';
const STD_BTN_CLASSNAME = 'buttonBar';
const MOB_BTN_CLASSNAME = 'buttonBarMobile';

const NUM_COLUMNS = 3; // for the selection grid of images

const Gallery = ({ content }) => {
  let [bigImgIndex, setBigImgIndex] = useState(0); // index to show the main image
  let [collection, setCollection] = useState('all'); // filtering collection selection
  const imageRef = useRef(null); // scroll to big image when a new image is selected
  let imageData = filterImages();

  // get all the images from the collection for the grid
  function filterImages() {
    if (!content) {
      return;
    }
    if (collection === 'all') return content.photos;
    console.log(content.photos, collection);
    var filtered = [...content.photos.filter((el) => el.type === collection)];
    return filtered;
  }

  // select a new index to show in the big image and scroll there
  function selectImage(index) {
    if (imageRef.current)
      window.scrollTo({
        top: imageRef.current.offsetTop + 30,
        behavior: 'smooth',
      });
    setTimeout(() => {
      console.log(index);
      setBigImgIndex(index);
    }, 100);
  }

  // set a new collection
  function changeCollection(coll) {
    setCollection(coll);
    setBigImgIndex(0);
  }

  // imageColumn object; mod should be 0, 1, 2 up to NUM_COLUMNS
  const ImageColumn = ({ modVal }) => {
    return (
      <div className='flexCol'>
        {imageData &&
          imageData.map((value, index) => {
            return index % NUM_COLUMNS === modVal ? (
              <img
                className='colImg'
                src={value.img && value.img.src}
                alt={value.img && value.img.alt}
                listid={index}
                onClick={() => {
                  selectImage(index);
                }}
                key={index}
              />
            ) : null;
          })}
      </div>
    );
  };

  // button bar object to render collection selectors
  const ButtonBar = ({ categories }) => {
    return (
      <div className={buttonBarClassName} ref={imageRef}>
        {categories &&
          categories.map((category, index) => {
            return (
              <button
                className={
                  collection === category ? BOLD_CLASSNAME : BASE_CLASSNAME
                }
                onClick={() => {
                  changeCollection(category);
                }}
                key={index}
              >
                {category}
              </button>
            );
          })}
      </div>
    );
  };

  // responsiveness
  let buttonBarClassName = STD_BTN_CLASSNAME;
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  if (isMobile) buttonBarClassName = MOB_BTN_CLASSNAME;

  return (
    <div className='gallery'>
      <ButtonBar categories={content && content.categories} />
      <BigImage isMobile={isMobile} imageData={imageData} index={bigImgIndex} />
      <div className='parent'>
        <ImageColumn modVal={0} />
        <ImageColumn modVal={1} />
        <ImageColumn modVal={2} />
      </div>
    </div>
  );
};

export default Gallery;
