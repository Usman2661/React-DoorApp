import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { withRouter} from 'react-router-dom';

class NavbarPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
    
state = {
  isOpen: false
};

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


}

myaccount = () => {
  this.props.history.push('/account');
}

render() {
  let loggedIn = localStorage.getItem("loggedIn");

  return (
      <MDBNavbar color="secondary-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Door Dashboard</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
          <MDBNavbarNav left>

            <MDBNavItem>
              <MDBNavLink to="/home">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/site">Create Site</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/door">Create Door</MDBNavLink>
            </MDBNavItem>
      
              <MDBNavItem>    
              <MDBNavLink to="/">Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/register">Register</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle className="dopdown-toggle" nav> 
             <label>Hi Usman  </label>
                  <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0"
                    style={{ height: "35px", padding: 0 }} alt="" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  <MDBDropdownItem onClick={this.myaccount}> My account</MDBDropdownItem>
                  <MDBDropdownItem onClick={this.logout}>Log out</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default withRouter(NavbarPage);