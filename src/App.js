import React from 'react';
import { HashRouter} from 'react-router-dom'
import { Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Printouts from './pages/Printouts'
import Gallery from './pages/Gallery'
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
  <div className = "app">
    <header>
      <nav>
        <ul className="nav">
          <li><NavLink activeClassName="active" className="link" exact to='/'>HOME</NavLink></li>
          <li><NavLink activeClassName="active" className="link" to='/about'>ABOUT</NavLink></li>
          <li><NavLink activeClassName="active" className="link" to='/gallery'>GALLERY</NavLink></li>
          <li><NavLink activeClassName="active" className="link" to='/printouts'>PRINTOUTS</NavLink></li>
          <li><NavLink activeClassName="active" className="link" to='/contact'>CONTACT</NavLink></li>
        </ul>
      </nav>
    </header>
    <div className="container">
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/printouts" component={Printouts} />
      <Route path="/contact" component={Contact} />
    </div>
  </div>
)

export default App;
