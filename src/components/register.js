import React, { Component } from 'react'
import { MDBContainer,
   MDBRow,
   MDBCol, MDBBtn , MDBModal,
   MDBModalBody, MDBModalHeader, 
   MDBModalFooter }  from 'mdbreact';
import axios from 'axios';
import { BrowserRouter as Router , Link , NavLink } from 'react-router-dom';


export class register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email:'',
      password:'',
      usertype:'', 
      message:'',
      modal: false
    };
    this.register = this.register.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUserType = this.handleUserType.bind(this);
  }
  handleName(event) {
    this.setState({name: event.target.value});
  }
  handleEmail(event) {
    this.setState({email: event.target.value});
  }
  handlePassword(event) {
    this.setState({password: event.target.value});
  }
  handleUserType(event) {
    this.setState({usertype: event.target.value});
  }

  register(event) {
    event.preventDefault();

    axios.post('http://localhost:3000/api/user/register', { 
      name: this.state.name, 
      email: this.state.email,
      password: this.state.password, 
      usertype: this.state.usertype
     })
    .then(res => {
      console.log(res);
      console.log(res.data.message);
      this.setState({message: "User created successfully"});
      this.setState({
        modal: !this.state.modal
      });
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
      this.setState({message: "There has been an error email may already be in use!!"});
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
              <form onSubmit={this.register}>>
                <p className="h4 text-center mb-4">Register</p>
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={this.state.name} onChange={this.handleName}
                />
                <br />
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={this.state.email} onChange={this.handleEmail}
                />
                <br />
                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={this.state.password} onChange={this.handlePassword}
                />

              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  User Type
                </label>
                <input
                  type="text"
                  id="usertype"
                  className="form-control"
                  value={this.state.usertype} onChange={this.handleUserType}
                />
                <br />
                <div className="text-center mt-4">
                  <MDBBtn color="indigo" type="submit" >Register</MDBBtn>
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
        <Link color="primary"  to="/" >Login Now</Link>
        </MDBModalFooter>
      </MDBModal>

        </MDBContainer>

        
        )
    }
}

export default register
