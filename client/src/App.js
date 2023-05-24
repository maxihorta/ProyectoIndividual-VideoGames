import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import Games from './components/games/games.jsx';
import Landing from './components/LandingPage/landing';
import Details from './components/deatails/details';
import Nav from './components/Navbar/Nav';
import Add from './components/Add/add';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Route path='/add'   component={Add}/>
      <Route path='/games/:id'   component={Details}/>
      <Route exact path='/games' component={Games} />
      <Route exact path='/'      component={Landing} />
    </div>
  );
}

export default App;