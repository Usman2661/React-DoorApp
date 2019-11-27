import React, { Component } from 'react';
import { MDBContainer,
    MDBRow,
    MDBCol, MDBBtn  }  from 'mdbreact';

export class useraccount extends Component {


    
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
                //   value={this.state.name} onChange={this.handleChange}
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
                //   value={this.state.email} onChange={this.handleChange}
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
                //   value={this.state.usertype} onChange={this.handleChange}
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
