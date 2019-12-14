import React, { Component } from "react";
// import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
//   MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { withRouter} from 'react-router-dom';
import {  Menu , Segment, Dropdown} from 'semantic-ui-react';

import axios from 'axios';

class NavbarPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      image:'',
      name:'',
      loggedIn:false
    };
  }
    
state = {
  isOpen: false,
  image:'',
  name:'',
  loggedIn: false
};



componentDidMount() {

  const loggedIn =  localStorage.getItem('loggedIn');
  this.setState({loggedIn: loggedIn});


    if (loggedIn) {

        const token =  localStorage.getItem('token');
        const id =  localStorage.getItem('userId');

        axios({
          url: 'http://localhost:3000/api/user/user?id='+id,
          method: 'get',
          headers: {
              'Authorization': 'Bearer '+token,
              'Content-Type': 'application/json'
          }
        })
        .then(res => {
            const users = res.data.users;
            this.setState({image: users.image});
            this.setState({name: users.name});
            // this.setState({ sites });
        })
        .catch (error => {
           console.log(error);  
        })
     }
    else {
      this.props.history.push('/');
    }
  }



toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

state = {
  collapseID: ""
};

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));

logout = () => {

  localStorage.removeItem("loggedIn");  //Logging user out
  localStorage.removeItem("email");  //Logging user out
  localStorage.removeItem("usertype");  //Logging user out
  localStorage.removeItem("name");  //Logging user out
  localStorage.removeItem("userId");  //Logging user out
  localStorage.removeItem("token");  //Logging user out
  this.props.history.push('/');

  this.setState({loggedIn: false});

}

myaccount = () => {
  this.props.history.push('/account');
}

handleItemClick = (e, { name }) =>  {
  if (name==='Register'){
    this.props.history.push('/register');
  }
  else if (name==='Login'){
    this.props.history.push('/');
  }
  else if (name==='Create Door'){
    this.props.history.push('/door');
  }
  else if (name==='Create Site'){
    this.props.history.push('/site');
  }
  else if (name==='Home'){
    this.props.history.push('/home');
  }

  this.setState({ activeItem: name })
}



render() {

  const name = localStorage.getItem('name');
  // const imageURL = this.state.image;
  const { activeItem } = this.state


  return (
      <Segment inverted>
      <Menu inverted pointing secondary>
      { this.state.loggedIn ?    <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
        /> : null }

     
{ this.state.loggedIn ?   <Menu.Item
          name='Create Site'
          active={activeItem === 'Create Site'}
          onClick={this.handleItemClick}
        /> : null }

{ this.state.loggedIn ?    <Menu.Item
          name='Create Door'
          active={activeItem === 'Create Door'}
          onClick={this.handleItemClick}
        /> : null }

     

{ this.state.loggedIn ? null :    <Menu.Item
          name='Login'
          active={activeItem === 'Login'}
          onClick={this.handleItemClick}
        /> }

      

{ this.state.loggedIn ? null :     <Menu.Item
          name='Register'
          active={activeItem === 'Register'}
          onClick={this.handleItemClick}
        /> }

     

      <Menu.Menu position='right'>
          <Dropdown item text={'Hi '+name}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.myaccount}>My Account</Dropdown.Item>
              <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </Menu.Menu>

      </Menu>


    </Segment>
    );
  }
}

export default withRouter(NavbarPage);