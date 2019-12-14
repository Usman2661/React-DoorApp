import React, { Component, Fragment } from 'react';
import { Button, Icon, Table , Statistic , Card
   ,Header, Image , Item , Dimmer, Loader , Confirm , Modal,
  Form} from 'semantic-ui-react';
import '../css/home.css';
import axios from 'axios';
var QRCode = require('qrcode.react');

export class home extends Component {
     state = { 
       doors: [],
       sites: [],
       Loader:true,
       Loader1:true,
       open:false,
       open1:false,
       delete_id:'',
       totalUsers:'',
       totalSites:'',
       totalDoors:'',
       open15: false,
       UpdateLoader:false,
       open136:false,
       qropen: false
    };

    constructor(props) {
      super(props);
      this.createDoor = this.createDoor.bind(this);
      this.viewDoor = this.viewDoor.bind(this);
      this.viewSite = this.viewSite.bind(this);
      this.deleteDoor = this.deleteDoor.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
      this.editDoor = this.editDoor.bind(this);
      this.updateDoor = this.updateDoor.bind(this);
      this.handleCancel2 = this.handleCancel2.bind(this);
      this.handleCancel136 = this.handleCancel136.bind(this);

      this.handleChange = this.handleChange.bind(this);
      this.deleteSite = this.deleteSite.bind(this);
      this.deletedSite = this.deletedSite.bind(this);
      this.viewQrCode = this.viewQrCode.bind(this);
      this.signOut = this.signOut.bind(this);
    } 

    componentDidMount() {
      const loggedIn =  localStorage.getItem('loggedIn');
      if (loggedIn){
        const token =  localStorage.getItem('token');

        setTimeout(()=> {
          this.signOut();
          console.log('User token expired');
        }, 5000);

        this.getSites();
                //Getting total doors
                axios({
                  url: 'http://localhost:3000/api/totalDoors',
                  method: 'get',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                  }
                })
                  .then(res => {
                    const totalDoors = res.data.doors;
                    this.setState({ totalDoors: totalDoors });
                  })
                  .catch (error => {
                    console.log(error);
                  })

                //Getting total Sites
                axios({
                  url: 'http://localhost:3000/api/totalSites',
                  method: 'get',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                  }
                })
                  .then(res => {
                    const totalSites = res.data.sites;
                    this.setState({ totalSites: totalSites });

                  })
                  .catch (error => {
                    console.log(error);
                  })

                //Getting total users
                axios({
                  url: 'http://localhost:3000/api/user/totalUsers',
                  method: 'get',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                  }
                })
                  .then(res => {
                    const totalUsers = res.data.users;
                    this.setState({ totalUsers: totalUsers });
                  })
                  .catch (error => {
                    console.log(error);
                  })

                  // Getting Site With Most Doors
                   axios({
                  url: 'http://localhost:3000/api/sitewithmostdoors',
                  method: 'get',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                  }
                })
                  .then(res => {
                    const sitewithmostdoors = res.data.site;

                    { sitewithmostdoors.map(door =>  
                      this.setState({ sitewithmostdoorsID: door._id })
                    )}

                    const mysite = this.state.sites.find(x => x._id === this.state.sitewithmostdoorsID).SiteName;
                    this.setState({ mysite: mysite });

                    // this.setState({ totalUsers: totalUsers });
                  })
                  .catch (error => {
                    console.log(error);
                  })
          
                  this.getDoors();

      
      }
      else {
        this.props.history.push('/');
      }
    }

    signOut() {   
      localStorage.clear();
      window.location.reload();
      this.props.history.push('/')
    }

    getDoors(){
      
      this.setState({ Loader: true });

      const token = localStorage.getItem('token');
      //Getting the doors
      axios({
        url: 'http://localhost:3000/api/doors',
        method: 'get',
        headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
      })
        .then(res => {
          const doors = res.data.doors;

          this.setState({ doors: doors });
          this.setState({ Loader: false });
          console.log(this.state.doors);
        })
        .catch (error => {
          console.log(error);
          this.setState({ Loader1: false });
        })
    }

    getSites(){

      this.setState({ Loader1: true });

      const token = localStorage.getItem('token');

          // Getting the sites
          axios({
            url: 'http://localhost:3000/api/sites',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
          })
            .then(res => {
              const sites = res.data.sites;
              console.log(sites)
              this.setState({ sites: sites });
              this.setState({ Loader1: false });
            })
            .catch (error => {
              console.log(error);
            })

    }
    createDoor(){
      this.props.history.push('/door');
    }
    viewDoor(id) {
      this.props.history.push(`/mydoor?id=${id}`);
    }
  
    viewSite(id) {
      this.props.history.push(`/mysite?id=${id}`);
    }

    viewQrCode(id){
      this.setState({ qrid: id });

      this.setState({ qropen: true })
    }

    handleConfirm(){

      this.setState({ open: false })
      const doorid = this.state.delete_id;
      const doors= this.state.doors;
      for (var i =0; i < doors.length; i++)
          if (doors[i]._id === doorid) {
          doors.splice(i,1);
          break;
      }

      this.setState({ doors: doors });

      const token = localStorage.getItem('token');
      axios({
        url: 'http://localhost:3000/api/door',
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
          id:doorid
        }
       })
        .then(res => {
          const door = res.data.doors;
          console.log(door);
        })
        .catch (error => {
          console.log(error);
          this.setState({ open: false });
        })

    }
    handleCancel = () => this.setState({ open: false })
    handleCancelqr = () => this.setState({ qropen: false })
    handleCancel1 = () => this.setState({ open1: false })
    handleCancel136 = () => this.setState({ open136: false })

    handleCancel2  (){
      this.setState({ open15: false });
    }

    
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    editDoor(id,DoorName,DoorLocation,DateTimeCreated, doorimage){

      const usertype = localStorage.getItem('usertype');
      if (usertype==='Manager'){
        this.setState({ doorid: id });
        this.setState({ DoorName: DoorName });
        this.setState({ DoorLocation: DoorLocation });
        this.setState({ DateTimeCreated: DateTimeCreated });
        this.setState({ doorimage: doorimage });
        this.setState({ open15: true });
      }
      else{
        this.setState({
          open1: true
        });
      }

     
    }

    
    updateDoor(event){
      event.preventDefault();
      
      this.setState({UpdateLoader: true});

      const token = localStorage.getItem('token');

      const options = {
        headers: {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
      }
      };

      axios.put('http://localhost:3000/api/updateDoor', { 
        id: this.state.doorid, 
        DoorName: this.state.DoorName,
        DoorLocation: this.state.DoorLocation
       },
       options
       )
      .then(res => {
        console.log(res.data);
        this.setState({UpdateLoader: false});
        this.setState({open15: false});
        this.getDoors();

      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
        this.setState({UpdateLoader: false}); 
        this.setState({open15: false});
      })

      

    }

    deleteDoor(id) {

      const usertype = localStorage.getItem('usertype');
      if(usertype==='Manager'){
        const doorid=id;
        this.setState({ delete_id: doorid });
        this.setState({ open: true })
      }
      else {
        this.setState({ open1: true })
      }
    }

    deletedSite(event){
      event.preventDefault();
      
      const token = localStorage.getItem('token');
      axios({
        url: 'http://localhost:3000/api/site',
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
          id:this.state.SiteID
        }
       })
        .then(res => {
          const site = res.data.site;
          console.log(site);
          this.setState({ open136: false })
          this.getSites();
        })
        .catch (error => {
          console.log(error);
          this.setState({ open136: false });
          this.getSites();
        })
    }

    deleteSite(id) {

      const usertype = localStorage.getItem('usertype');
      if(usertype==='Manager'){
        const SiteID=id;
        this.setState({ SiteID: SiteID });
        this.setState({ open136: true })


      }
      else {
        this.setState({ open1: true })
      }
    }


    render() {
        return (
          // style={{position:'absolute',marginLeft:'10px', width:'1300px'}}
          <Fragment>
              <Card className='statHolder' >
          <Card.Content>
          <Statistic.Group widths='four'>
          <Statistic>
            <Statistic.Value>
              <Icon name='building' />{this.state.totalDoors}
            </Statistic.Value>
            <Statistic.Label>Total Doors</Statistic.Label>
          </Statistic>
   
          <Statistic>
            <Statistic.Value>
              <Icon name='building' />{this.state.totalSites}
            </Statistic.Value>
            <Statistic.Label>Total Sites</Statistic.Label>
          </Statistic>
      
          <Statistic>
            <Statistic.Value>
              <Icon name='building' />  
            </Statistic.Value>
            <Statistic.Label>{this.state.mysite}</Statistic.Label>
            <Statistic.Label>Site with most doors</Statistic.Label>
          </Statistic>  

          <Statistic>
            <Statistic.Value>
              <Icon name='users' /> {this.state.totalUsers}
            </Statistic.Value>
            <Statistic.Label>Total Users</Statistic.Label>
          </Statistic>  
        </Statistic.Group>
          </Card.Content>
        </Card>
        
        
        <Card style={{ position:'absolute',width:'900px', marginLeft:'350px',marginTop:'150px'}}>
    <Card.Content>
      <Card.Header>Doors</Card.Header>
    </Card.Content>
    <Card.Content>

    {this.state.Loader ? 
     <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      :  null   
      }   
   <Table color='red' key='red' id='doorTable' className='doorTable' name='doorTable'  compact celled definition>
   <Table.Header>
     <Table.Row>
       <Table.HeaderCell />
       <Table.HeaderCell>Site Name</Table.HeaderCell>
       <Table.HeaderCell>Door</Table.HeaderCell>
       <Table.HeaderCell>Date Time Created</Table.HeaderCell>
     </Table.Row>
   </Table.Header>

   <Table.Body>
   { this.state.doors.map(door =>  
     <Table.Row>
     
       <Table.Cell collapsing>
       <Button.Group basic size='small'>
       <Button icon='eye'  onClick={() => this.viewDoor(door._id)}/>
       <Button icon='edit'  onClick={() => this.editDoor(door._id, door.DoorName, door.DoorLocation , door.DateTimeCreated, door.Image)}/>
    
       <Button icon='qrcode'  onClick={() => this.viewQrCode(door._id)}/>

    {/* <Button icon='edit' /> */}
    <Button style={{color:'red'}} icon='delete' onClick={() => this.deleteDoor(door._id)} />
  </Button.Group>
       </Table.Cell>
       {door.Door_Site.map(Door_Site => 
    <Table.Cell>{Door_Site.SiteName}</Table.Cell>
    )}
      <Table.Cell>
          <Header as='h4' image>
            <Image src={door.Image} rounded size='mini' />
            <Header.Content>
              {door.DoorName}
             <Header.Subheader>{door.DoorLocation}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
     <Table.Cell>{door.DateTimeCreated}</Table.Cell>
     </Table.Row>
   )}
   </Table.Body>

   <Table.Header fullWidth>
     <Table.Row>
       <Table.HeaderCell />
       <Table.HeaderCell colSpan='4'>
         <Button
           floated='right'
           icon
           labelPosition='left'
           primary
           size='small'

           onClick={this.createDoor}
         >
           <Icon name='file' /> Add Door
         </Button>
       </Table.HeaderCell>
     </Table.Row>
   </Table.Header>
 </Table> 
</Card.Content>
</Card>
<Confirm
          open={this.state.open}
          header='Delete Door'
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
 <Card style={{position:'absolute',marginLeft:'10px',marginTop:'150px'}}>
    <Card.Content>
      <Card.Header>Sites</Card.Header>
    </Card.Content>
    <Card.Content>

    {this.state.Loader1 ? 
     <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      :  null   
      } 

    <Item.Group  style={{width:'200px'}} divided>
    {this.state.sites.map(site =>  

// onClick={() => this.viewSite(site._id)}
    <Item >
      <Item.Image size='tiny' src={site.Image} />
      <Item.Content>
        <Item.Header>{site.SiteName}</Item.Header>
        <Item.Description>
         {site.SiteAddressLine1}
        </Item.Description>

        <Item.Extra>
        <Button floated='right' size='tiny'  icon='eye' onClick={() => this.viewSite(site._id)}/>
        <Button floated='right' size='tiny' color='red' icon='delete' Red  onClick={() => this.deleteSite(site._id)}/>
        </Item.Extra>
      </Item.Content>

    </Item>   

  )}
  </Item.Group>
    </Card.Content>

    <Modal  open={this.state.qropen}>
      <Header icon='qrcode' content='Qr Barcode' />
      <Modal.Content>
      <QRCode value={this.state.qrid} />
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.handleCancelqr}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>

      <Modal  open={this.state.open1}>
      <Header icon='lock' content='Un-Authorised' />
      <Modal.Content>
        <p>
          You dont have permissions to perform this action
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.handleCancel1}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
    <Modal open={this.state.open15}>

    {this.state.UpdateLoader ? 
     <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      :  null   
      }   

    <Modal.Header>Edit Door</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={this.state.doorimage} />
      <Modal.Description>
        <Header>Door Details</Header>
        <Form onSubmit={this.updateDoor}>
      <Form.Field >
        <label> Door Name </label>
        <input type='text' placeholder='Door Name'
             name="DoorName"   value={this.state.DoorName} onChange={this.handleChange}
         />
      </Form.Field>
      <Form.Field >
        <label> Door Location </label>
        <input type='text' placeholder='Door Location'
             name="DoorLocation"   value={this.state.DoorLocation} onChange={this.handleChange}
         />
      </Form.Field>
      <Form.Field >
        <label> Date Time Created </label>
        <input type='text' placeholder='Door Location'
             name="DoorLocation"   value={this.state.DateTimeCreated} onChange={this.handleChange}
         disabled/>
      </Form.Field>
    
  

    <Button secondary type='submit'>Save Changes</Button>
  </Form>
      </Modal.Description>
    </Modal.Content>

    <Modal.Actions>
      <Button color='red'>
        <Icon name='remove'  onClick={() => this.setState({ open15: false }) }/> Cancel
      </Button>

    </Modal.Actions>

  </Modal>

  <Confirm
          open={this.state.open136}
          header='Delete Site'
          onCancel={this.handleCancel136}
          onConfirm={this.deletedSite}
        />

  </Card>


 </Fragment>
        )
    }
}

export default home
