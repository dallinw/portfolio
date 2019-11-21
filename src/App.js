import React from 'react';
import { HashRouter} from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Illustrations from './pages/Illustrations'
import Paintings from './pages/Paintings'
import Contact from './pages/Contact'

import './App.css';

const App = () => {
  return(
    <HashRouter>
      <BaseLayout />
    </HashRouter>
  )
}

const BaseLayout = () => (
  <div className="base">
    <header>
      <nav>
        <ul className="nav">
          <li><Link className="link" to='/'>HOME</Link></li>
          <li><Link className="link" to='/about'>ABOUT</Link></li>
          <li><Link className="link" to='/paintings'>PAINTINGS</Link></li>
          <li><Link className="link" to='/illustrations'>ILLUSTRATIONS</Link></li>
          <li><Link className="link" to='/contact'>CONTACT</Link></li>
        </ul>
      </nav>
    </header>
    <div className="container">
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="paintings" component={Paintings} />
      <Route path="illustrations" component={Illustrations} />
      <Route path="/contact" component={Contact} />
    </div>
  </div>
)

export default App;
