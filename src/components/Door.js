import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBModal,
    MDBModalBody, MDBModalHeader, 
    MDBModalFooter } from 'mdbreact';

import axios from 'axios';


export class Door extends Component {

    state = {
       sites: [], 
       DoorName: '',
       DoorLocation: '',
       SiteID: '',
       modal: false,
       message:'',
       datetime:''
      };


      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.createDoor = this.createDoor.bind(this);
      } 


    componentDidMount() {

      //Checking user logged in status
        const loggedIn =  localStorage.getItem('loggedIn');
        const usertype =  localStorage.getItem('usertype');

        if (loggedIn){
            if(usertype!=='Manager'){
                this.props.history.push('/permission');
            }
            else{
                
            const token =  localStorage.getItem('token');

            axios({
              url: 'http://localhost:3000/api/sites',
              method: 'get',
              headers: {
                  'Authorization': 'Bearer '+token,
                  'Content-Type': 'application/json'
              }
            })
              .then(res => {
                const sites = res.data.sites;
                this.setState({ sites });
              })
              .catch (error => {
                console.log(error);
              })
              var currentDateTime = new Date();
              var date = currentDateTime.getFullYear() + '-' + (currentDateTime.getMonth()+1) + '-' + currentDateTime.getDate() +' '+ currentDateTime.getHours()+':'+ currentDateTime.getMinutes()+':'+ currentDateTime.getSeconds();

              this.setState({datetime: date});
              }
         }
        else {
          this.props.history.push('/');
        }
      }

      //Handle the on change for the values of form
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }

      //Submit the form
      createDoor(event) {
        event.preventDefault();
        const token =  localStorage.getItem('token');

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        }
    
        axios.post('http://localhost:3000/api/door', { 
          SiteID: this.state.SiteID, 
          DoorName: this.state.DoorName,
          DoorLocation: this.state.DoorLocation, 
          DateTimeCreated: this.state.datetime
        }, {
          headers:headers
        })
       .then(res => {
          console.log(res);
          console.log(res.data.message);
          this.setState({message: "Door Created!!"});
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
                <form onSubmit={this.createDoor}>
                  <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                    Door Name
                  </label>
                  <input
                    type="text"
                    id="defaultFormRegisterNameEx"
                    className="form-control"
                    name="DoorName"
                    value={this.state.DoorName} onChange={this.handleChange}

                  />
                  <br />
                  <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                    Door Location
                  </label>
                  <input
                    type="text"
                    id="defaultFormRegisterEmailEx"
                    className="form-control"
                    name="DoorLocation"
                    value={this.state.DoorLocation} onChange={this.handleChange}
                  />
                  <br />
                  <select className="browser-default custom-select" name="SiteID" onChange={this.handleChange}>
                    <option>Choose your Site</option>
                    { this.state.sites.map( site =>

                    <option value={site._id}>{site.SiteName}</option>


                    )}
                    </select>
                  <div className="text-center mt-4">
                    <MDBBtn color="unique" type="submit">
                      Create Door
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

export default Door
