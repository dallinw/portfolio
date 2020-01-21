import React, {useState, useEffect} from 'react';
import Back from '../assets/images/icons/back.png';
import Forward from '../assets/images/icons/forward.png';
import './BigImage.css';

const HIDE_BUTTON_CLASSNAME = "hiddenButton";
const SHOW_BUTTON_CLASSNAME = "showButton";
const STD_IMG_PARENT_CLASSNAME = "imgParent";
const MOB_IMG_PARENT_CLASSNAME = "imgParentMobile";
const STD_IMG_CLASSNAME = "mainImg";
const MOB_IMG_CLASSNAME = "mainImgMobile";

const BigImage = ({isMobile, imageData, images, index}) => {
  let [showArrowsClassName, setShowArrowsClassName] = useState(HIDE_BUTTON_CLASSNAME); // show scroll arrows on hover
  let [thisIndex, setThisIndex] = useState(index); // show scroll arrows on hover
  if(!imageData[thisIndex]) setThisIndex(0);

  // on key press, cycle images
  useEffect(() => {
    const handler = function(event) {
      // right arrow
      if (event.keyCode === 39) scrollImage("forward");
      // left arrow
      else if(event.keyCode === 37) scrollImage("backward");
    }
    window.addEventListener('keydown', handler)
    return () => { window.removeEventListener('keydown', handler)}
  })

  // if the index prop changes, set the local index to match
  useEffect(() => {
    if(index !== thisIndex) setThisIndex(index);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // scroll forward or backward; triggered by click or by keypress
  function scrollImage(direction) {
    let idx = thisIndex;
    const lastIndex = images.length-1;
    if(direction==="forward")
    {
        if(idx < lastIndex) idx++;
        else idx = 0;
    }
    else if(direction === "backward")
    {
        if(idx > 0) idx--;
        else idx= lastIndex;
    }
    setThisIndex(idx);
  }

  // toggle visibility for arrows on hover
  function toggleShowArrows() {
    if(showArrowsClassName === HIDE_BUTTON_CLASSNAME) setShowArrowsClassName(SHOW_BUTTON_CLASSNAME);
    else setShowArrowsClassName(HIDE_BUTTON_CLASSNAME);
  }

  let imgParentClassName = STD_IMG_PARENT_CLASSNAME;
  let imgClassName = STD_IMG_CLASSNAME;
  if(isMobile)
  {
    imgParentClassName=MOB_IMG_PARENT_CLASSNAME;
    imgClassName=MOB_IMG_CLASSNAME;
  }

  if(imageData[thisIndex]) return(
    <div className={imgParentClassName} onMouseEnter={()=>{toggleShowArrows()}} onMouseLeave={()=>{toggleShowArrows()}}>
      {(isMobile) ? null : 
      <div className={showArrowsClassName} onClick={() => {scrollImage("backward")}}>
        <button className="scrollButton">
            <img className="smallIcon" src={Back} alt="back"/>
        </button>
      </div>}
      <img onClick={() => {scrollImage("forward")}} className={imgClassName} src={images[thisIndex]} alt={imageData[thisIndex].title}/>
      <div className="scrollArea" onClick={() => {scrollImage("forward")}}>
        <div className="info">
          <p className="title">{imageData[thisIndex].title}</p>
          <p className="year">{imageData[thisIndex].medium}</p>
          <p className="year">{imageData[thisIndex].year}</p>
        </div>
        {(isMobile) ? null: <div className={showArrowsClassName}>
          <button className="scrollButton"><img className="smallIcon" src={Forward} alt="forward"/></button>
        </div>}
      </div>
    </div>
  )
  else return null;
}

export default BigImage;