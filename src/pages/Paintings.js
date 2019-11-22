import React, {useState} from 'react';
import Back from '../images/back.png';
import Forward from '../images/forward.png';
import './Paintings.css';

const imageContext = require.context('../images', true);
const NUM_COLUMNS = 3;

const Paintings = () => {
  const images = ['bitter', 'eggplant', 'calamansi', 'dragonfruit', 'carrot', 'chili', 'ube', 'papaya'];
  let [bigImgIndex, setBigImgIndex] = useState(0);
  
  function scroll(direction) {
    let index = bigImgIndex;
    if(direction==="forward" && bigImgIndex < images.length-1) index++;
    else if(direction === "backward" && bigImgIndex > 0) index--;
    setBigImgIndex(index);
  }

  function selectImage(index){
    setBigImgIndex(index);
    window.scroll({top: 150, left: 0, behavior: 'smooth' })
  }

  const ImageColumn = ({modVal}) => {
    return(
      <div className="flexCol">
        {images.map((value, index) => {
          return(index % NUM_COLUMNS === modVal) ? <img className="colImg" src={getImgSrc(value)} listId={index} key={index} onClick={()=>{selectImage(index)}} alt=""/>
          : null
        })}
      </div>
    )
  }

  return (
    <div>
      <div className="imgParent">
        <div className="hiddenButton" onClick={() => {scroll("backward")}}>
          <button className="scrollButton"><img className="smallIcon" src={Back} alt="back"/></button>
        </div>
        <img onClick={() => {scroll("forward")}} className="mainImg" src={getImgSrc(images[bigImgIndex])} alt=""/>
        <div className="hiddenButton" onClick={() => {scroll("forward")}}>
          <button className="scrollButton"><img className="smallIcon" src={Forward} alt="forward"/></button>
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
function getImgSrc(str) {
  return imageContext(`./${str}.jpg`)
}

export default Paintings;