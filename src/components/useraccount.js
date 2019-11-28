import React, { Component } from 'react';
import { MDBContainer,
    MDBRow,
    MDBCol, MDBBtn  }  from 'mdbreact';

import axios from 'axios';

export class useraccount extends Component {
  

  state = {
    name:'',
    email:'',
    usertype:''
  }
  
  componentDidMount() {

    //Checking user logged in status
    const loggedIn =  localStorage.getItem('loggedIn');

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

              this.setState({name: users.name});
              this.setState({email: users.email });
              this.setState({usertype: users.usertype});

        
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



    render() {



        return (
            <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form onSubmit={this.updateUser}>
                <p className="h4 text-center mb-4">My Account Details </p>
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  value={this.state.name}
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
                   value={this.state.email}
                 />
                <br />
            

              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  User Type
                </label>
                <input
                  type="text"
                  id="usertype"
                  className="form-control"
                  name="usertype"
                   value={this.state.usertype}
                 />
                <br/>
                <div className="text-center mt-4">
                  <MDBBtn color="indigo" type="submit" >Save Changes</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>

        </MDBContainer>

        )
    }
}

export default useraccount
