import React, { Component,Fragment } from 'react'
import { Button, Form ,Modal ,Select, Image, Card, Input} from 'semantic-ui-react';
import axios from 'axios';
import '../css/register.css';


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
    this.loginPage = this.loginPage.bind(this);

  }
  handleChange(event) {
    console.log(event.target.name);
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state.usertype);
  }

  getUserType = (event, {value}) => {
    this.setState({ usertype: value});
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
    this.props.history.push('/');
  }

    render() {
        return (

<Fragment>
<div className='headerRegister'>

<Image src='http://localhost:3000/uploads/icon.PNG' size='tiny'  verticalAlign='middle' />
    <span style={{fontSize:'25px',fontWeight:'bold'}}>Create new account</span>
</div>


<Card className='registerCard'>
  <Card.Content>
  <Form onSubmit={this.register}>
  <Input  className='nameInputRegister' type='text'  icon='user circle' iconPosition='left' placeholder='Name'
       name="name"   value={this.state.name} onChange={this.handleChange}
   required/>
  <Input  className='emailInputRegister' type='email' icon='mail' iconPosition='left' placeholder='Email'
       name="email"   value={this.state.email} onChange={this.handleChange}
   required/>
  <Input  className='passwordInputRegister' type='password' icon='lock' iconPosition='left' placeholder='Password'  name="password"
       value={this.state.password} onChange={this.handleChange} required />


<Select   className='usertypeRegister' placeholder='User Type' options={userTypeOptions}  name='usertype' onChange={this.getUserType} required/>

<Button className='registerButton'secondary type='submit'>Register</Button>

</Form>
  </Card.Content>
</Card>

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
  

<Card className='loginhere'>
          <Card.Content>
            <p> Already have an account?</p><a onClick={this.loginPage}> Login Now </a>
          </Card.Content>
        </Card>

</Fragment>
    
        )
    }
}

export default register
