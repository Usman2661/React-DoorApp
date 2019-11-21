import React , { Component} from 'react';
import './App.css';
import Navbar from './header/NavbarPage';
import Login from './components/login';


class App extends Component {
  render()
  { 
     return (
    <div className="App">
             <Navbar />
     <Login/>
    </div>
  );
}
  }


export default App;
