import React , { Component} from 'react';
import './App.css';
import Navbar from './header/NavbarPage';
import Login from './components/login'
import { BrowserRouter as Router , Route , Switch , Link} from 'react-router-dom';
import Register from './components/register';
import Error from './components/Error';
import Home from './components/home';
import SiteCreate from './components/Site';
import Permission from './components/Permission';
import Door from './components/Door';





class App extends Component {
  render()
  { 
     return (
    <div className="App">
    
     <Router>
            <div>
            <Navbar />
            <Switch>
             <Route path="/" component={Login} exact/>
             <Route path="/register" component={Register}/>
             <Route path="/home" component={Home}/>
             <Route path="/site" component={SiteCreate}/>
             <Route path="/permission" component={Permission}/>
             <Route path="/door" component={Door}/>



             <Route component={Error}/>
            
           </Switch>
            </div>
          </Router>
    </div>
  );
}
  }


export default App;
