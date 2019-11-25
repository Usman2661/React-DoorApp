import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBModal,
    MDBModalBody, MDBModalHeader, 
    MDBModalFooter } from 'mdbreact';
import axios from 'axios';
   
export class Site extends Component {

        state = {
            SiteName: '',
            SiteAddressLine1:'',
            SiteAddressLine2:'',
            PostCode:'', 
            City:'',
            modal: false
          };

    componentDidMount() {
        const loggedIn =  localStorage.getItem('loggedIn');
        if (loggedIn){
  
        }
        else {
          this.props.history.push('/');
        }
      }

      constructor(props) {
        super(props);
        this.state = {
          SiteName: '',
          SiteAddressLine1:'',
          SiteAddressLine2:'',
          PostCode:'', 
          City:'',
          modal: false
        };

        this.handleCity = this.handleCity.bind(this);
        this.handlePostCode = this.handlePostCode.bind(this);
        this.handleSiteAddressLine1 = this.handleSiteAddressLine1.bind(this);
        this.handleSiteAddressLine2 = this.handleSiteAddressLine2.bind(this);
        this.handleSiteName = this.handleSiteName.bind(this);
        this.createSite = this.createSite.bind(this);

      }


      handleSiteName(event) {
        this.setState({SiteName: event.target.value});
      }
      handleSiteAddressLine1(event) {
        this.setState({SiteAddressLine1: event.target.value});
      }
      handleSiteAddressLine2(event) {
        this.setState({SiteAddressLine2: event.target.value});
      }
      handlePostCode(event) {
        this.setState({PostCode: event.target.value});
      }
      handleCity(event) {
        this.setState({City: event.target.value});
      }

      toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

      createSite(event){
          event.preventDefault();
          axios.post('http://localhost:3000/api/site', { 
            SiteName: this.state.SiteName, 
            SiteAddressLine1: this.state.SiteAddressLine1,
            SiteAddressLine2: this.state.SiteAddressLine2, 
            PostCode: this.state.PostCode,
            City: this.state.City
          })
         .then(res => {
            console.log(res);
            console.log(res.data.message);
            this.setState({message: "Site Created Succesfully!!"});
            this.setState({
            modal: !this.state.modal
         });
        })
        .catch(error => {
            console.log(error);
            this.setState({message: "There has been an error"});
            this.setState({
            modal: !this.state.modal
        });
        })
        }
        
    render() {
        return (
            <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <form onSubmit={this.createSite}>
                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                    Site Name
                  </label>
                  <input
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    value={this.state.SiteName} onChange={this.handleSiteName}

                  />
                  <br />
                  <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                    Site Address Line 1
                  </label>
                  <input
                    type="text"
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    value={this.state.SiteAddressLine1} onChange={this.handleSiteAddressLine1}

                  />
                  <br />
                  <label
                    htmlFor="defaultFormRegisterConfirmEx"
                    className="grey-text"
                  >
                    Site Address Line 2
                  </label>
                  <input
                    type="text"
                    id="defaultFormRegisterConfirmEx"
                    className="form-control"
                    value={this.state.SiteAddressLine2} onChange={this.handleSiteAddressLine2}
                  />
                  <br />
                  <label  htmlFor="defaultFormRegisterConfirmEx" className="grey-text"> Post Code</label>
                  <input
                    type="text"
                    id="defaultFormRegisterConfirmEx"
                    className="form-control"
                    value={this.state.PostCode} onChange={this.handlePostCode}

                  />
                 <br />
                 <label  htmlFor="defaultFormRegisterConfirmEx" className="grey-text">City</label>
                  <input
                    type="text"
                    id="defaultFormRegisterConfirmEx"
                    className="form-control"
                    value={this.state.City} onChange={this.handleCity}

                  />
                 <br />

                  <div className="text-center mt-4">
                    <MDBBtn color="unique" type="submit">
                      Create Site
                    </MDBBtn>
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

export default Site
