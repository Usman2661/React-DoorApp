import React , { Component} from 'react';
import './App.css';
import Navbar from './header/NavbarPage';
import Login from './components/login'
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import Register from './components/register';
import Error from './components/Error';
import Home from './components/home';
import SiteCreate from './components/Site';
import Permission from './components/Permission';
import Door from './components/Door';
import UserAccount from './components/useraccount';
import MyDoor from './components/doorPage';
import MySite from './components/sitePage';
import DocView from './components/documentView';

class App extends Component {

  state = {
    loggedIn:false
  }
  componentDidMount(){
    const loggedIn =  localStorage.getItem('loggedIn');
    this.setState({loggedIn: loggedIn});

    console.log(loggedIn);
  }
 
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
             <Route path="/account" component={UserAccount}/>
             <Route path="/mydoor" component={MyDoor}/>
             <Route path="/mysite" component={MySite}/>

             <Route path="/doc" component={DocView}/>

             <Route component={Error}/>
            
           </Switch>
            </div>
          </Router>
    </div>
  );
}
  }


export default App;
