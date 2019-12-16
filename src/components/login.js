import React, { Component, Fragment } from 'react';
import { Button ,Modal , Card  , Input, Image, Form} from 'semantic-ui-react';
import axios from 'axios';
import '../css/login.css';

class login extends Component {

  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

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
      email:'',
      password:'',
      message:'',
      open: false, 
      loggedIn: false
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
 
  login(event) {
    event.preventDefault();

    axios.post('http://localhost:3000/api/user/login', { 
      email: this.state.email,
      password: this.state.password
     })
    .then(res => {
      console.log(res);
      console.log(res.data);

      var email = res.data.email;
      var usertype = res.data.usertype;
      var name = res.data.name;
      var userId = res.data.userId;
      var token = res.data.token;

      this.setState({message: "Login Success"});
    
      this.setState({
        open: !this.state.open
      });
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('email', email);
      localStorage.setItem('usertype', usertype);
      localStorage.setItem('name', name);
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);

      window.location.reload();
      
      let path = 'home';
      this.props.history.push(path);

    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
      this.setState({message: "Invalid Credentials: Email or Password may be wrong !!"});
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


    render() {
        return (
  

          <Fragment>

<div className='headerLogin'>

<Image src='http://localhost:3000/uploads/icon.PNG' size='tiny'  verticalAlign='middle' />
    <span style={{fontSize:'25px',fontWeight:'bold'}}> Login to your account</span>

</div>
          <Card className='loginCard'>
          <Card.Content>
     
      <Form onSubmit={this.login}>

        <Input className='emailInput' type='email' icon='mail' iconPosition='left' placeholder='Email'
             name="email" value={this.state.email} onChange={this.handleChange}
         required/>
        <Input className='passwordInput' type='password' placeholder='Password'  name="password" iconPosition='left' icon='lock'
             value={this.state.password} onChange={this.handleChange} required />

             
      <Button className='loginButton' secondary type='submit' onClick={this.login}>Login</Button>
      </Form>


      <Modal dimmer='blurring' size='mini' open={this.state.open} onClose={this.toggle}>
          <Modal.Header>Message</Modal.Header>
          <Modal.Content>
        <p>{this.state.message}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.toggle}>OK</Button>
       
          </Modal.Actions>
        </Modal>


          </Card.Content>
     
        </Card>

        <Card className='signuphere'>
          <Card.Content>
            <p> Sign up Here</p>
          </Card.Content>
        </Card>

 
        </Fragment>

        )
    }
}

export default login
