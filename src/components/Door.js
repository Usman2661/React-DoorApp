import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBModal,
    MDBModalBody, MDBModalHeader, 
    MDBModalFooter } from 'mdbreact';


export class Door extends Component {

    componentDidMount() {
        const loggedIn =  localStorage.getItem('loggedIn');
        const usertype =  localStorage.getItem('usertype');

        if (loggedIn){
            if(usertype!=='Manager'){
                this.props.history.push('/permission');
            }
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
                <form onSubmit={this.createDoor}>
                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                    Door Name
                  </label>
                  <input
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    // value={this.state.SiteName} onChange={this.handleSiteName}

                  />
                  <br />
                  <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                    Door Location
                  </label>
                  <input
                    type="text"
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    // value={this.state.SiteAddressLine1} onChange={this.handleSiteAddressLine1}
                  />
                  <br />
                  <select className="browser-default custom-select">
                    <option>Choose your Site</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    </select>
                  <div className="text-center mt-4">
                    <MDBBtn color="unique" type="submit">
                      Create Door
                    </MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>


            {/* <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Message</MDBModalHeader>
        <MDBModalBody>
          {this.state.message}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal> */}


          </MDBContainer>
        )
    }
}

export default Door
