import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class login extends Component {

  login() {
    console.log("The login button was clicked!!!");
  }


    render() {
        return (
          <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h4 text-center mb-4">Sign in</p>
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Your email
                </label>
                <input
                  type="email"
                  id="defaultFormLoginEmailEx"
                  className="form-control"
                />
                <br />
                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                  Your password
                </label>
                <input
                  type="password"
                  id="defaultFormLoginPasswordEx"
                  className="form-control"
                />
                <div className="text-center mt-4">
                  <MDBBtn color="indigo" type="button" onClick = {this.login}>Login</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        )
    }
}

export default login
