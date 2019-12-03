import React, { Component } from 'react'
import { Button, Form ,Modal , Select} from 'semantic-ui-react';
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

                const mysite= sites.map(({ SiteName, _id }) => ({ text: SiteName, value: _id }));

                this.setState({ sites: mysite });

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

      getSite = (event, {value}) => {
        //console.log(value);
       // let SiteID = event.target.textContent;
        this.setState({ SiteID: value});
    }


    render() {
        return (
      <Form onSubmit={this.createDoor}>
      <Form.Field >
        <label> Door Name </label>
        <input type='text' placeholder='Door Name'
             name="DoorName"   value={this.state.DoorName} onChange={this.handleChange}
         required/>
      </Form.Field>
      <Form.Field >
        <label> Door Location </label>
        <input type='text' placeholder='Door Location'
             name="DoorLocation"   value={this.state.DoorLocation} onChange={this.handleChange}
         required/>
      </Form.Field>
      <Form.Field >
        <label> Site </label>
        <Select placeholder='Site' options={this.state.sites}  name='SiteID' onChange={this.getSite} required/>

      </Form.Field>

      <Button type='submit'>Create Door</Button>
      
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
        )
    }
}

export default Door
