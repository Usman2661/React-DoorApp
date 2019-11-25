import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router , Route, Link , NavLink, Hash} from 'react-router-dom';
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

logout = () => {

  localStorage.removeItem("loggedIn");  //Logging user out
  localStorage.removeItem("email");  //Logging user out
  localStorage.removeItem("usertype");  //Logging user out
  localStorage.removeItem("name");  //Logging user out
  localStorage.removeItem("userId");  //Logging user out

  this.props.history.push('/');


}

render() {
  return (
      <MDBNavbar color="green" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Door Monitoring</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/home">Home</MDBNavLink>
            </MDBNavItem>

      
            <MDBNavItem>
              <MDBNavLink to="/">Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
            <MDBNavLink to="/register">Register</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
            <MDBNavLink to="/site">Create Site</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
            <MDBNavLink to="/door">Create Door</MDBNavLink>
            </MDBNavItem>


          </MDBNavbarNav>
          <MDBNavbarNav right>


            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Hi </MDBDropdownItem>
                  <MDBDropdownItem  onClick= {this.logout}>Logout</MDBDropdownItem>
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