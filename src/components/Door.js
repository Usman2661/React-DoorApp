import React, { Component, Fragment } from 'react'
import { Button, Form ,Modal , Select, Input, Card, Image} from 'semantic-ui-react';
import axios from 'axios';
import '../css/door.css';


export class Door extends Component {

    state = {
       sites: [], 
       DoorName: '',
       DoorLocation: '',
       SiteID: '',
       modal: false,
       message:'',
       datetime:'',
       image:null,
       file:null
      };


      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.createDoor = this.createDoor.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.signOut = this.signOut.bind(this);
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

                const mysite= sites.map(({ SiteName, _id }) => ({ text: SiteName, value: _id }));

                this.setState({ sites: mysite });

              })
              .catch (error => {
                console.log(error);
              })

              console.log(this.state.sites);
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

      signOut() {   
        localStorage.clear();
        window.location.reload();
        this.props.history.push('/')
      }

      //Submit the form
      createDoor(event) {
        event.preventDefault();
        const token =  localStorage.getItem('token');

        let form_data = new FormData();
        form_data.append('file', this.state.image, this.state.image.name);
        form_data.append('DoorName', this.state.DoorName);
        form_data.append('DoorLocation', this.state.DoorLocation);
        form_data.append('SiteID', this.state.SiteID);
        form_data.append('DateTimeCreated', this.state.datetime);

        let url = 'http://localhost:3000/api/door';

        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer '+token
          }
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

    getSite = (event, {value}) => {
      //console.log(value);
      // let SiteID = event.target.textContent;
      this.setState({ SiteID: value});
    }

    handleImageChange = (e) => {
      this.setState({
        image: e.target.files[0]
      })
      this.setState({
        file: URL.createObjectURL(e.target.files[0])
      })
      
    };



    render() {
        return (
          <Fragment>

<div className='headerDoor'>

<Image src='http://localhost:3000/uploads/icon.PNG' size='tiny'  verticalAlign='middle' />
    <span style={{fontSize:'25px',fontWeight:'bold'}}> Create Door</span>
</div>

<Card className='doorCard'>
  <Card.Content>
  <Form onSubmit={this.createDoor}>
        <Input className='doorName' icon='building' iconPosition='left' type='text' placeholder='Door Name'
             name="DoorName"   value={this.state.DoorName} onChange={this.handleChange}
         required/>
        <Input className='doorLocation' icon='building outline' iconPosition='left' type='text' placeholder='Door Location'
             name="DoorLocation"   value={this.state.DoorLocation} onChange={this.handleChange}
         required/>
        <Select className='doorSite' placeholder='Site' options={this.state.sites}  name='SiteID' onChange={this.getSite} required/>

  <Input className='myDoorFile' type="file"
  id="image"
  accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>

      <Button className='createDoorButton' secondary type='submit'>Create Door</Button>

      </Form>
  </Card.Content>
</Card>
    
      
      <Modal dimmer='blurring' size='mini' open={this.state.modal} onClose={this.toggle}>
          <Modal.Header>Message</Modal.Header>
          <Modal.Content>
        <p>{this.state.message}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.toggle}>Close</Button>
      
          </Modal.Actions>
        </Modal>

        </Fragment>

        )
    }
}

export default Door
