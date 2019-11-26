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

        this.handleChange = this.handleChange.bind(this);
        this.createSite = this.createSite.bind(this);

      }

      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
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
                    name="SiteName"
                    value={this.state.SiteName} onChange={this.handleChange}

                  />
                  <br />
                  <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                    Site Address Line 1
                  </label>
                  <input
                    type="text"
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    name="SiteAddressLine1"
                    value={this.state.SiteAddressLine1} onChange={this.handleChange}

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
                    name="SiteAddressLine2"
                    value={this.state.SiteAddressLine2} onChange={this.handleChange}
                  />
                  <br />
                  <label  htmlFor="defaultFormRegisterConfirmEx" className="grey-text"> Post Code</label>
                  <input
                    type="text"
                    id="defaultFormRegisterConfirmEx"
                    className="form-control"
                    name="PostCode"
                    value={this.state.PostCode} onChange={this.handleChange}

                  />
                 <br />
                 <label  htmlFor="defaultFormRegisterConfirmEx" className="grey-text">City</label>
                  <input
                    type="text"
                    id="defaultFormRegisterConfirmEx"
                    className="form-control"
                    name="City"
                    value={this.state.City} onChange={this.handleChange}
                    
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
