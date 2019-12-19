import React, { Component } from 'react';
import { Button, Form ,Modal , Card,Image,Icon } from 'semantic-ui-react';
import axios from 'axios';
import '../css/userAccount.css'

export class useraccount extends Component {
  

  state = {
    name:'',
    email:'',
    usertype:'',
    image:null,
    imageurl:''
  }

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      usertype:'',
      image:null,
      imageurl:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.updateUser = this.updateUser.bind(this);

  }
  
  componentDidMount() {

    //Checking user logged in status
    const loggedIn =  localStorage.getItem('loggedIn');

      if (loggedIn) {

          // Check for logout 
      var currentDateTime = new Date();
      var date = currentDateTime.getFullYear() + '-' + (currentDateTime.getMonth()+1) + '-' + currentDateTime.getDate() +' '+ currentDateTime.getHours()+':'+ currentDateTime.getMinutes()+':'+ currentDateTime.getSeconds();
      const lasttime = localStorage.getItem('expiry');

      var current = new Date(date);
      var expiry = new Date(lasttime);

      if ( current > expiry){
        this.signOut();
      }
      /*******************************/

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
              this.setState({imageurl: users.image});

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
        <Card className='myaccount' >
        <Image src={this.state.imageurl}  size='tiny' centered circular/>
        <Card.Content>
          <Card.Header>{this.state.name}</Card.Header>
          <Card.Meta>
        <span className='date'>{this.state.usertype}</span>
          </Card.Meta>
          <Card.Description>
            Account Details
          </Card.Description>
          <Form onSubmit={this.updateUser}>
        <Form.Field >
          <label> Name </label>
          <input type='text' placeholder='Name'
               name="name"   value={this.state.name} onChange={this.handleChange}
           required/>
        </Form.Field>
        <Form.Field >
          <label> Email </label>
          <input type='text' placeholder='Email'
               name="email"   value={this.state.email} onChange={this.handleChange}
           required/>
        </Form.Field>
        <Form.Field >
          <label> User Type</label>
          <input type='text' placeholder='User Type'
               name="usertype"   value={this.state.usertype} onChange={this.handleChange} disabled/>
        </Form.Field>   
        <Form.Field >
        <label>Avatar Image</label>
         <input type="file" id="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
        </Form.Field>
        
        <Button secondary type='submit'>Save Changes</Button>
        
        <Modal dimmer='blurring' size='mini' open={this.state.modal} onClose={this.toggle}>
            <Modal.Header>Message</Modal.Header>
            <Modal.Content>
          <p>{this.state.message}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.toggle}>Close</Button>        
            </Modal.Actions>
          </Modal>
        
        </Form>
        </Card.Content>
        <Card.Content extra>
        </Card.Content>
      </Card>
        )
    }
}

export default useraccount
