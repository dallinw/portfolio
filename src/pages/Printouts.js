import React, { useState } from 'react';
import PrintoutCard from '../components/PrintoutCard';
import DocumentCollection from '../components/DocumentCollection';
import Search from '../assets/images/hi-res/search.png'
import Hold from '../assets/images/hi-res/hold.png'
import Puzzles from '../assets/images/hi-res/puzzles.png'
import { useMediaQuery } from 'react-responsive'
import './Printouts.css'

const Printouts = () => {
  const [collection, setCollection] = useState("default");
  const [show, setShow] = useState(true);

  const isMobile = useMediaQuery({ query: '(max-width: 550px)' })

  function updateCollection(coll)
  {
    setShow(false, setCollection(coll));
    setTimeout(()=>{setShow(true)}, 500);
    if(isMobile) setTimeout(()=>{window.scrollTo({top: 1070, behavior: 'smooth' })}, 600);
    else setTimeout(()=>{window.scrollTo({top: 500, behavior: 'smooth' })}, 600);
  }

  return (
      <div className="printouts">
        <div className="cards">
        <button className="blankButton" onClick={()=>updateCollection("mazes")}>
            <PrintoutCard heading="Puzzles" image={Puzzles}/>
          </button>
         <button className="blankButton" onClick={()=>updateCollection("searches")}>
            <PrintoutCard heading="Searches" image={Search}/>
          </button>
          <button className="blankButton" onClick={()=>updateCollection("coloring")}>
            <PrintoutCard heading="Coloring Pages" image={Hold}/>
          </button>
        </div>
        <DocumentCollection collection={collection} show={show}/>
      </div>
  )
}

export default Printouts;