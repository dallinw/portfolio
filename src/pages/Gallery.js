import React, {useState, useRef} from 'react';
import Back from '../assets/images/icons/back.png';
import Forward from '../assets/images/icons/forward.png';
import { useMediaQuery } from 'react-responsive'
import './Gallery.css';

/**************************************************
 * Constants
 *************************************************/

const NUM_COLUMNS = 3;
const illustrations = ['bear.png', 'girls.png', 'house.png', 'memory.png', 'tongue.png'];
const paintings = ['jame.jpg'];
const prints = ['restaurant.png', 'housesgirls.png'];
const misc = ['jumping.jpg', 'laughing.jpg', 'problem.jpg', 'colorfulgirls.jpg']
const all = shuffle(illustrations.concat(paintings.concat(prints.concat(misc))));
const fileNames = { 'illustrations': illustrations, 'paintings': paintings, 'prints': prints, 'all': all }
const BASE_CLASSNAME = "collectionButton";
const BOLD_CLASSNAME = "collectionButton bold";
const STD_BTN_CLASSNAME = "buttonBar";
const MOB_BTN_CLASSNAME = "buttonBarMobile";
const STD_IMG_CLASSNAME = "imgContainer";
const MOB_IMG_CLASSNAME = "imgContainerMobile";
const buttonClasses = { all: BOLD_CLASSNAME, illustrations: BASE_CLASSNAME, paintings: BASE_CLASSNAME, prints: BASE_CLASSNAME }
const context = require.context('../assets/images', true);

const Gallery = () => {
  let [bigImgIndex, setBigImgIndex] = useState(0);
  let [collection, setCollection] = useState("all");
  const imageRef = useRef(null);

  let collectionNames = fileNames[collection];
  let images = getImages();
  let buttonBarClassName = STD_BTN_CLASSNAME;
  let imgParentClassName = STD_IMG_CLASSNAME;

  function getImages()
  {
    let paths = [];
    collectionNames.forEach(name => {
      let image = context(`./${name}`)
      paths.push(image)
    })
    return paths;
  }
  
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

  function selectImage(index){
    window.scrollTo({top: imageRef.current.offsetTop - 20, behavior: 'smooth' })
    setTimeout(()=>{setBigImgIndex(index)}, 100);
  }

  function changeCollection(coll){
    const prev = collection;
    setCollection(coll);
    setBigImgIndex(0);
    buttonClasses[prev] = BASE_CLASSNAME;
    buttonClasses[coll] = BOLD_CLASSNAME;
  }

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

  const isMobile = useMediaQuery({ query: '(max-width: 550px)' })
  if(isMobile)
  {
    buttonBarClassName=MOB_BTN_CLASSNAME;
    imgParentClassName=MOB_IMG_CLASSNAME;
  }

  return (
    <div className="gallery">
      <div className={buttonBarClassName}>
        <button className={buttonClasses["all"]} onClick={() => {changeCollection("all")}}>all</button>
        <button className={buttonClasses["illustrations"]} onClick={() => {changeCollection("illustrations")}}>illustrations</button>
        <button className={buttonClasses["paintings"]} onClick={() => {changeCollection("paintings")}}>paintings</button>
        <button className={buttonClasses["prints"]} onClick={() => {changeCollection("prints")}}>prints</button>
      </div>
      <div className={imgParentClassName}>
      {(isMobile) ? null : 
        <div className="hiddenButton" onClick={() => {scrollImage("backward")}}>
          <button className="scrollButton"><img className="smallIcon" src={Back} alt="back"/></button>
        </div>}
        <img onClick={() => {scrollImage("forward")}} ref={imageRef} className="mainImg" src={images[bigImgIndex]} alt=""/>
      {(isMobile) ? null: <div className="hiddenButton" onClick={() => {scrollImage("forward")}}>
          <button className="scrollButton"><img className="smallIcon" src={Forward} alt="forward"/></button>
        </div>}
      </div>
      <div className="parent">
        <ImageColumn modVal={0} />
        <ImageColumn modVal={1} />
        <ImageColumn modVal={2} />
      </div>
    </div>
  )
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default Gallery;