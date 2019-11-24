import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody,  MDBModal,
  MDBModalBody, MDBModalHeader, 
  MDBModalFooter } from 'mdbreact';
import axios from 'axios';

class login extends Component {

  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  
 
  

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      message:'',
      modal: false
    };
    this.login = this.login.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }
  handlePassword(event) {
    this.setState({password: event.target.value});
  }
  login(event) {
    event.preventDefault();

    axios.post('http://localhost:3000/api/user/login', { 
      email: this.state.email,
      password: this.state.password
     })
    .then(res => {
      console.log(res);
      console.log(res.data.message);
      this.setState({message: "Login Success"});
      
      this.setState({
        modal: !this.state.modal
      });

      let path = 'home';
      this.props.history.push(path);
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
      this.setState({message: "Invalid Credentials"});
      this.setState({
        modal: !this.state.modal
      });
    })
  }


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }


    render() {
        return (
          <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form onSubmit={this.login}>
                <p className="h4 text-center mb-4">Sign in</p>
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Your email
                </label>
                <input
                  type="email"
                  id="defaultFormLoginEmailEx"
                  className="form-control"
                  value={this.state.email} onChange={this.handleEmail}
                />
                <br />
                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                  Your password
                </label>
                <input
                  type="password"
                  id="defaultFormLoginPasswordEx"
                  className="form-control"
                  value={this.state.password} onChange={this.handlePassword}
                />
                <div className="text-center mt-4">
                  <MDBBtn color="indigo" type="submit" >Login</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>


          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Message</MDBModalHeader>
        <MDBModalBody>
          {this.state.message}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
        </MDBContainer>
        )
    }
}

export default login
