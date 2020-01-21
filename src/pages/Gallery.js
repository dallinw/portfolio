import React, {useState, useRef} from 'react';
import { useMediaQuery } from 'react-responsive';
import BigImage from '../components/BigImage';
import all from '../components/ImagesStaticData';
import './Gallery.css';

/**************************************************
 * Constants
 *************************************************/
const hiRes = require.context('../assets/images/hi-res', true);
const lowRes = require.context('../assets/images/low-res', true);

//classnames for responsiveness and show/hide
const BASE_CLASSNAME = "collectionButton";
const BOLD_CLASSNAME = "collectionButton bold";
const STD_BTN_CLASSNAME = "buttonBar";
const MOB_BTN_CLASSNAME = "buttonBarMobile";

const NUM_COLUMNS = 3; // for the selection grid of images
const buttonClasses = { all: BOLD_CLASSNAME, portrait: BASE_CLASSNAME, text: BASE_CLASSNAME, journal: BASE_CLASSNAME }

const Gallery = () => {
  let [bigImgIndex, setBigImgIndex] = useState(0); // index to show the main image
  let [collection, setCollection] = useState("all"); // filtering collection selection
  const imageRef = useRef(null); // scroll to big image when a new image is selected
  let imageData = filterImages();
  let images = getHiRes();

  // get all the images from the collection for the grid
  function filterImages()
  {
    if(collection === "all") return all;
    var filtered = all.filter(function (obj) {
      return obj.type.indexOf(collection) !== -1;
    });
    return filtered;
  }

  // from the filtered image array, get the actual files, for high resolution
  function getHiRes()
  {
    let images = [];
    imageData.forEach(name=> {
      let image = hiRes(`./${name.file}`)
      images.push(image);
    })
    return images;
  }

    // from the filtered image array, get the actual files, for low resolution
    // TODO
    function getLowRes()
    {
      let images = [];
      imageData.forEach(name=> {
        let image = lowRes(`./${name.file}`)
        images.push(image);
      })
      return images;
    }

  // select a new index to show in the big image and scroll there
  function selectImage(index){
    if(imageRef.current) window.scrollTo({top: imageRef.current.offsetTop+30, behavior: 'smooth' })
    setTimeout(()=>{setBigImgIndex(index)}, 100);
  }

  // set a new collection
  function changeCollection(coll){
    setCollection(coll);
    setBigImgIndex(0);
    for (var key in buttonClasses) {
      if (buttonClasses.hasOwnProperty(key)) {
        if(buttonClasses[key] === BOLD_CLASSNAME) buttonClasses[key] = BASE_CLASSNAME;
      }
    }
    buttonClasses[coll] = BOLD_CLASSNAME;
  }

  // imageColumn object; mod should be 0, 1, 2 up to NUM_COLUMNS
  const ImageColumn = ({modVal}) => {
    return(
      <div className="flexCol">
        {images.map((value, index) => {
          return(index % NUM_COLUMNS === modVal) ? 
            <img className="colImg" src={value} listid={index} onClick={()=>{selectImage(index)}} key={index} alt={imageData[index].title}/>
          : null
        })}
      </div>
    )
  }
  
  // button bar object to render collection selectors
  const ButtonBar = () => {
    return (
      <div className={buttonBarClassName} ref={imageRef}>
        <button className={buttonClasses["all"]} onClick={() => {changeCollection("all")}}>all</button>
        <button className={buttonClasses["portrait"]} onClick={() => {changeCollection("portrait")}}>portraits</button>
        <button className={buttonClasses["text"]} onClick={() => {changeCollection("text")}}>text</button>
        <button className={buttonClasses["journal"]} onClick={() => {changeCollection("journal")}}>journals</button>
      </div>
    )
  }

  // responsiveness
  let buttonBarClassName = STD_BTN_CLASSNAME;
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  if(isMobile) buttonBarClassName=MOB_BTN_CLASSNAME;

  return (
    <div className="gallery">
    <ButtonBar />
      <BigImage isMobile={isMobile} imageData={imageData} images={images} index={bigImgIndex}/>
      <div className="parent">
          <ImageColumn modVal={0} />
          <ImageColumn modVal={1} />
          <ImageColumn modVal={2} />
      </div>
    </div>
  )
}

export default Gallery;