import React, { Component } from 'react';
import './App.css';
import Login from "./components/login/login.jsx";
import Home from "./components/home/home.jsx";
import { BrowserRouter, Route } from 'react-router-dom';
// import MapContainer from './components/map/map';
import Map from './components/map/Map';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <Route path='/' exact component={Login}/>
       <Route path='/home' exact component = {Home}/>
       <Route path='/map' exact component = {Map}/>

      </BrowserRouter>
    );
  }
}

export default App;
