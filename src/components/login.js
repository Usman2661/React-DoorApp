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

  componentDidMount() {

    const loggedIn =  localStorage.getItem('loggedIn');
    
    if (loggedIn){
      let path = '/home';
      this.props.history.push(path);
    }

  }

  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      message:'',
      modal: false, 
      loggedIn: false
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
 
  login(event) {
    event.preventDefault();

    axios.post('http://localhost:3000/api/user/login', { 
      email: this.state.email,
      password: this.state.password
     })
    .then(res => {
      console.log(res);
      console.log(res.data);

      var email = res.data.email;
      var usertype = res.data.usertype;
      var name = res.data.name;
      var userId = res.data.userId;
      var token = res.data.token;

      this.setState({message: "Login Success"});
      
      this.setState({
        modal: !this.state.modal
      });

      localStorage.setItem('loggedIn', true);
      localStorage.setItem('email', email);
      localStorage.setItem('usertype', usertype);
      localStorage.setItem('name', name);
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);

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
                  name="email"
                  value={this.state.email} onChange={this.handleChange}
                />
                <br />
                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                  Your password
                </label>
                <input
                  type="password"
                  id="defaultFormLoginPasswordEx"
                  className="form-control"
                  name="password"
                  value={this.state.password} onChange={this.handleChange}
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
