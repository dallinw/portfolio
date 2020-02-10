import React, {useState} from 'react';
import { HashRouter} from 'react-router-dom'
import { Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import Home from './pages/Home'
import About from './pages/About'
import Printouts from './pages/Printouts'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Instagram from './assets/images/icons/instagram.png'

import './App.css';

const App = () => {
  const [show, setShow] = useState(false);
  // fade in
  setTimeout(() => {
    setShow({didMount: true})
  }, 500)

  return(
    <HashRouter>
      <BaseLayout show={show}/>
    </HashRouter>
  )
}

const BaseLayout = ({show}) => {
  const componentClasses = ['app'];
  if (show) { componentClasses.push('show'); }
  let navClassName = "nav"
  let parentClassName=""
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  if(isMobile)
  {
    navClassName="navMobile";
    parentClassName="mobile"
  }
  return (
    <div className={componentClasses.join(' ')}>
      <header>
        <nav className={parentClassName}>
        <a href="https://instagram.com/mikki.antonio">
          <img className='ig' src={Instagram} alt='ig'></img>
        </a>
          <ul className={navClassName}>
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
}

export default App;
