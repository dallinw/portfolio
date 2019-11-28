import React, {useState} from 'react';
import Image from '../components/Image'
import Name from '../components/Name'
import './Home.css'

const Home = () => {
const [show] = useState(true)
const componentClasses = ['home'];
if (show) { componentClasses.push('show'); }
return (
    <div className={componentClasses.join(' ')}>
      <Name />
      <div className="imagesContainer">
          <Image className="img"/>
          <Image className="img"/>
          <Image className="img"/>
      </div>
    </div>
  )
}

export default Home;