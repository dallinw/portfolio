import React from 'react';
import Image from '../components/Image'
import Name from '../components/Name'
import './Home.css'

const Home = () => {
return (
    <div className="App">
      <Name />
      <Image className="img"/>
      <Image className="img"/>
      <Image className="img"/>
    </div>
  )
}

export default Home;