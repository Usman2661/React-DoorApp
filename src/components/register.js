import React, { Component } from 'react'
import { Button, Form ,Modal ,Select} from 'semantic-ui-react';
import axios from 'axios';

const userTypeOptions = [
  {  value: 'Engineer', text: 'Engineer' },
  {  value: 'Manager', text: 'Manager' },
]

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
      usertype:null, 
      message:'',
      open: false,
      loggedIn: false
    };
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(event.target.name);
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state.usertype);
  }

  getUserType = (event, {value}) => {
    console.log(value);
    let usertype = event.target.textContent;
    this.setState({ usertype: usertype});
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
        open: !this.state.open
      });
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
      this.setState({message: "There has been an error email may already be in use!!"});
      this.setState({
        open: !this.state.open
      });
    })
  }


  toggle = () => {
    this.setState({
      open: !this.state.open
    });
  }

  loginPage(){
    this.props.history.push('/login');
  }

    render() {
        return (



<Form onSubmit={this.register}>
<Form.Field >
  <label> Name </label>
  <input type='text' placeholder='Name'
       name="name"   value={this.state.name} onChange={this.handleChange}
   required/>
</Form.Field>
<Form.Field >
  <label> Email </label>
  <input type='email' placeholder='Email'
       name="email"   value={this.state.email} onChange={this.handleChange}
   required/>
</Form.Field>
<Form.Field>
  <label>Password</label>
  <input type='password' placeholder='Password'  name="password"
       value={this.state.password} onChange={this.handleChange} required />
</Form.Field>

<Form.Field>

<Select placeholder='User Type' options={userTypeOptions}  name='usertype' onChange={this.getUserType} required/>
</Form.Field>


<Button type='submit'>Register</Button>

<Modal dimmer='blurring' size='mini' open={this.state.open} onClose={this.toggle}>
    <Modal.Header>Message</Modal.Header>
    <Modal.Content>
  <p>{this.state.message}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={this.toggle}>Close</Button>
      {/* <Button positive onClick={this.loginPage}>Login Now</Button> */}

    </Modal.Actions>
  </Modal>

</Form>

        
        )
    }
}

export default register
