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
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/paintings'>Paintings</Link></li>
            <li><Link to='/illustrations'>Illustrations</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
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
