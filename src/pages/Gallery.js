import React, {useState, useEffect, useRef} from 'react';
import Back from '../assets/images/icons/back.png';
import Forward from '../assets/images/icons/forward.png';
import { useMediaQuery } from 'react-responsive'
import './Gallery.css';

/**************************************************
 * Constants
 *************************************************/

// image objects
const all = [{title: 'Restaurant', year: '2019', file: 'restaurant.png', type:'print'},
                {title: 'Jame Our Bear', year: '2019', file: 'bear.png', type: 'illustration'},
                {title: 'Girls', year: '2019', file: 'girls.png', type: 'illustration'},
                {title: 'House', year: '2019', file: 'house.png', type: 'illustration'},
                {title: 'Memory Game', year: '2019', file: 'memory.png', type: 'illustration'},
                {title: 'Tongue', year: '2019', file: 'tongue.png', type: 'illustration'},
                {title: 'Jame', year: '2019', file: 'jame.jpg', type: 'painting'},
                {title: 'Houses Girls', year: '2019', file: 'housesgirls.png', type:'print'},
                {title: 'Jumping', year: '2019', file: 'jumping.jpg'},
                {title: 'Laughing', year: '2019', file: 'laughing.jpg'},
                {title: 'Problem', year: '2019', file: 'problem.jpg'},
                {title: 'Colorful Girls', year: '2019', file: 'colorfulgirls.jpg'}
]
const context = require.context('../assets/images', true);

//classnames for responsiveness and show/hide
const BASE_CLASSNAME = "collectionButton";
const BOLD_CLASSNAME = "collectionButton bold";
const STD_BTN_CLASSNAME = "buttonBar";
const MOB_BTN_CLASSNAME = "buttonBarMobile";
const STD_IMG_PARENT_CLASSNAME = "imgParent";
const MOB_IMG_PARENT_CLASSNAME = "imgParentMobile";
const STD_IMG_CLASSNAME = "mainImg";
const MOB_IMG_CLASSNAME = "mainImgMobile";
const HIDE_BUTTON_CLASSNAME = "hiddenButton";
const SHOW_BUTTON_CLASSNAME = "showButton";
const NUM_COLUMNS = 3; // for the selection grid of images
const buttonClasses = { all: BOLD_CLASSNAME, illustration: BASE_CLASSNAME, painting: BASE_CLASSNAME, print: BASE_CLASSNAME }

const Gallery = () => {
  let [bigImgIndex, setBigImgIndex] = useState(0); // index to show the main image
  let [collection, setCollection] = useState("all"); // filtering collection selection
  let [showArrowsClassName, setShowArrowsClassName] = useState(HIDE_BUTTON_CLASSNAME); // show scroll arrows on hover
  const imageRef = useRef(null); // scroll to big image when a new image is selected
  let imageData = filterImages();
  let images = getContext();

  useEffect(() => {
    const handler = function(event) {
      // right arrow
      if (event.keyCode === 39) scrollImage("forward");
      // left arrow
      else if(event.keyCode === 37) scrollImage("forward");
    }
    window.addEventListener('keydown', handler)
    return () => { window.removeEventListener('keydown', handler)}
  })

  // get all the images from the collection for the grid
  function filterImages()
  {
    if(collection === "all") return all;
    var filtered = all.filter(function (obj) {
      return obj.type === collection;
    });
    return filtered;
  }

  // from the filtered image array, get the actual files
  function getContext()
  {
    let images = [];
    imageData.forEach(name=> {
      let image = context(`./${name.file}`)
      images.push(image);
    })
    return images;
  }
  
  // scroll forward or backward; triggered by click or by keypress
  function scrollImage(direction) {
    let index = bigImgIndex;
    const lastIndex = images.length-1;
    if(direction==="forward")
    {
      if(bigImgIndex < lastIndex) index++;
      else index = 0;
    }
    else if(direction === "backward")
    {
      if(bigImgIndex > 0) index--;
      else index = lastIndex;
    }
    setBigImgIndex(index);
  }

  // select a new index to show in the big image and scroll there
  function selectImage(index){
    window.scrollTo({top: imageRef.current.offsetTop - 20, behavior: 'smooth' })
    setTimeout(()=>{setBigImgIndex(index)}, 100);
  }

  // set a new collection
  function changeCollection(coll){
    const prev = collection;
    setCollection(coll);
    setBigImgIndex(0);
    buttonClasses[prev] = BASE_CLASSNAME;
    buttonClasses[coll] = BOLD_CLASSNAME;
  }

  // imageColumn object; mod should be 0, 1, 2 up to NUM_COLUMNS
  const ImageColumn = ({modVal}) => {
    return(
      <div className="flexCol">
        {images.map((value, index) => {
          return(index % NUM_COLUMNS === modVal) ? <img className="colImg" src={value} listid={index} key={index} onClick={()=>{selectImage(index)}} alt=""/>
          : null
        })}
      </div>
    )
  }

  // toggle visibility for arrows on hover
  function toggleShowArrows() {
    if(showArrowsClassName === HIDE_BUTTON_CLASSNAME) setShowArrowsClassName(SHOW_BUTTON_CLASSNAME);
    else setShowArrowsClassName(HIDE_BUTTON_CLASSNAME);
  }

  // responsiveness
  let buttonBarClassName = STD_BTN_CLASSNAME;
  let imgParentClassName = STD_IMG_PARENT_CLASSNAME;
  let imgClassName = STD_IMG_CLASSNAME;
  const isMobile = useMediaQuery({ query: '(max-width: 550px)' })
  if(isMobile)
  {
    buttonBarClassName=MOB_BTN_CLASSNAME;
    imgParentClassName=MOB_IMG_PARENT_CLASSNAME;
    imgClassName=MOB_IMG_CLASSNAME;
  }

  return (
    <div className="gallery">
      <div className={buttonBarClassName}>
        <button className={buttonClasses["all"]} onClick={() => {changeCollection("all")}}>all</button>
        <button className={buttonClasses["illustration"]} onClick={() => {changeCollection("illustration")}}>illustrations</button>
        <button className={buttonClasses["painting"]} onClick={() => {changeCollection("painting")}}>paintings</button>
        <button className={buttonClasses["print"]} onClick={() => {changeCollection("print")}}>prints</button>
      </div>
      <div className={imgParentClassName} onMouseEnter={()=>{toggleShowArrows()}} onMouseLeave={()=>{toggleShowArrows()}}>
      {(isMobile) ? null : 
        <div className={showArrowsClassName} onClick={() => {scrollImage("backward")}}>
          <button className="scrollButton"><img className="smallIcon" src={Back} alt="back"/></button>
        </div>}
        <img onClick={() => {scrollImage("forward")}} ref={imageRef} className={imgClassName} src={images[bigImgIndex]} alt=""/>
      <div className="scrollArea" onClick={() => {scrollImage("forward")}}>
        <div className="info">
          <p className="title">{imageData[bigImgIndex].title}</p>
          <p className="year">{imageData[bigImgIndex].year}</p>
        </div>
        {(isMobile) ? null: <div className={showArrowsClassName}>
          <button className="scrollButton"><img className="smallIcon" src={Forward} alt="forward"/></button>
        </div>}
      </div>
      </div>
      <div className="parent">
          <ImageColumn modVal={0} />
          <ImageColumn modVal={1} />
          <ImageColumn modVal={2} />
        </div>
    </div>
  )
}

export default Gallery;