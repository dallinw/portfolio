import React from 'react';
import PrintoutCard from '../components/PrintoutCard';
import Papaya from '../images/papaya.jpg'
import Dragonfruit from '../images/carrot.jpg'
import Eggplant from '../images/eggplant.jpg'
import './Printouts.css'

const Printouts = () => {
  return (
      <div className="printouts">
          <PrintoutCard heading="Puzzles" image={Papaya}/>
          <PrintoutCard heading="Searches" image={Dragonfruit}/>
          <PrintoutCard heading="Coloring Pages" image={Eggplant}/>
      </div>
  )
}

export default Printouts;