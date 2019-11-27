import React, { useState } from 'react';
import PrintoutCard from '../components/PrintoutCard';
import DocumentCollection from '../components/DocumentCollection';
import Papaya from '../assets/images/papaya.jpg'
import Dragonfruit from '../assets/images/carrot.jpg'
import Eggplant from '../assets/images/chili.jpg'
import './Printouts.css'

const Printouts = () => {
  const [collection, setCollection] = useState("default");
  const [show, setShow] = useState(true);

  function updateCollection(coll)
  {
    setShow(false, setCollection(coll));
    setTimeout(()=>{setShow(true)}, 500);
  }

  return (
      <div className="printouts">
          <button className="blankButton" onClick={()=>updateCollection("puzzles")}>
            <PrintoutCard heading="Puzzles" image={Papaya}/>
          </button>
          <button className="blankButton" onClick={()=>updateCollection("searches")}>
            <PrintoutCard heading="Searches" image={Dragonfruit}/>
          </button>
          <button className="blankButton" onClick={()=>updateCollection("coloring")}>
            <PrintoutCard heading="Coloring Pages" image={Eggplant}/>
            </button>
          <DocumentCollection collection={collection} show={show}/>
      </div>
  )
}

export default Printouts;