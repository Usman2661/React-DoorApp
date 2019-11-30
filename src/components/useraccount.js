import React, { Component } from 'react';
import { MDBContainer,
    MDBRow,
    MDBCol, MDBBtn  }  from 'mdbreact';

import axios from 'axios';

export class useraccount extends Component {
  

  state = {
    name:'',
    email:'',
    usertype:'',
    image:null
  }

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      usertype:'',
      image:null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.updateUser = this.updateUser.bind(this);

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

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleImageChange = (e) => {
      this.setState({
        image: e.target.files[0]
      })
    };

    updateUser(event) {
      event.preventDefault();

      const token = localStorage.getItem('token');
      const id =  localStorage.getItem('userId');


      console.log(this.state);
      let form_data = new FormData();
      form_data.append('file', this.state.image, this.state.image.name);
      form_data.append('name', this.state.name);
      form_data.append('email', this.state.email);
      form_data.append('id', id);

      let url = 'http://localhost:3000/api/user/update';
      axios.put(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': 'Bearer '+token
        }
      })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err))

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
                  value={this.state.name} onChange={this.handleChange}
                 required/>
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
                 required/>
                <br />
            

              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  User Type
                </label>
                <input
                  type="text"
                  id="usertype"
                  className="form-control"
                  name="usertype"
                   value={this.state.usertype} onChange={this.handleChange}
                 required/>
                <br/>
                
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Avatar Image 
                </label>
                <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} />
             </p>

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
