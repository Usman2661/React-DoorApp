import React, { Component } from 'react'
import { MDBContainer,
   MDBRow,
   MDBCol, MDBBtn , MDBModal,
   MDBModalBody, MDBModalHeader, 
   MDBModalFooter }  from 'mdbreact';
import axios from 'axios';
import { BrowserRouter as Router , Link , NavLink } from 'react-router-dom';

export class register extends Component {

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
      name: '',
      email:'',
      password:'',
      usertype:'', 
      message:'',
      modal: false,
      loggedIn: false,
    };
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
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
                  name="name"
                  value={this.state.name} onChange={this.handleChange}
                />
                <br />
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
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
                  id="password"
                  className="form-control"
                  name="password"
                  value={this.state.password} onChange={this.handleChange}
                />

              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  User Type
                </label>
                <input
                  type="text"
                  id="usertype"
                  className="form-control"
                  name="usertype"
                  value={this.state.usertype} onChange={this.handleChange}
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
