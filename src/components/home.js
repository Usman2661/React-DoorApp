import React, { Component, Fragment } from 'react';
import { Button, Icon, Table , Statistic , Card ,Label , Item , Dimmer, Loader , Confirm} from 'semantic-ui-react';
import '../css/home.css';
import axios from 'axios';

export class home extends Component {
     state = { 
       doors: [],
       sites: [],
       Loader:true,
       Loader1:true,
       open:false,
       delete_id:'',
       totalUsers:'',
       totalSites:'',
       totalDoors:''
    };

    constructor(props) {
      super(props);
      this.createDoor = this.createDoor.bind(this);
      this.viewDoor = this.viewDoor.bind(this);
      this.deleteDoor = this.deleteDoor.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
    } 

    componentDidMount() {

      const loggedIn =  localStorage.getItem('loggedIn');
      if (loggedIn){
        const token =  localStorage.getItem('token');

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
                console.log(doors)
                this.setState({ doors: doors });
                this.setState({ Loader: false });
              })
              .catch (error => {
                console.log(error);
                this.setState({ Loader1: false });
              })


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
      }
      else {
        this.props.history.push('/');
      }
    }

    createDoor(){
      this.props.history.push('/door');
    }

    // showSite(id){

    // }

    viewDoor(id) {
      this.props.history.push(`/mydoor?id=${id}`);
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
          console.log(door)

          
        })
        .catch (error => {
          console.log(error);

          this.setState({ open: false })
        })

    }
    handleCancel = () => this.setState({ open: false })

    deleteDoor(id) {
      const doorid=id;
      this.setState({ delete_id: doorid });
      this.setState({ open: true })
    }

    render() {
        return (
          <Fragment>
              <Card style={{position:'absolute',marginLeft:'10px', width:'1300px'}}>
          <Card.Content>
          <Statistic.Group widths='four'>
          <Statistic>
            <Statistic.Value>
              <Icon name='building' />{this.state.totalDoors}
            </Statistic.Value>
            <Statistic.Label>Total Doors</Statistic.Label>
          </Statistic>
          {/* <Statistic>
            <Statistic.Value text>
              Three
              <br />
              Thousand
            </Statistic.Value>
            <Statistic.Label>Signups</Statistic.Label>
          </Statistic> */}
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
       <Table.HeaderCell>Door Name</Table.HeaderCell>
       <Table.HeaderCell>Door Location</Table.HeaderCell>
       <Table.HeaderCell>Date Time Created</Table.HeaderCell>
     </Table.Row>
   </Table.Header>

   <Table.Body>
   { this.state.doors.map(door =>  
     <Table.Row>
     
       <Table.Cell collapsing>
       <Button.Group basic size='small'>
       <Button icon='eye'  onClick={() => this.viewDoor(door._id)}/>
    {/* <Button icon='edit' /> */}
    <Button style={{color:'red'}} icon='delete' onClick={() => this.deleteDoor(door._id)} />
  </Button.Group>
       </Table.Cell>
    <Table.Cell>{door.SiteID}</Table.Cell>
     <Table.Cell>    
        <Label as='a' color='blue'>{door.DoorName} </Label>
        </Table.Cell>
     <Table.Cell>{door.DoorLocation}</Table.Cell>
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

    {/* {this.state.Loader1 ?  */}

     {/* <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer> */}

      {/* :  null   
      } */}

    <Item.Group link style={{width:'200px'}}>
    {this.state.sites.map(site =>  
    <Item
    // id={site._id} onClick={this.showSite(site._id)} 
    >
      <Item.Image size='tiny' src={site.Image} />
      <Item.Content>
        <Item.Header>{site.SiteName}</Item.Header>
        <Item.Description>
         {site.SiteAddressLine1}
         {/* {site.SiteAddressLine2}
         {site.PostCode}
         {site.City} */}
        </Item.Description>
      </Item.Content>
    </Item>   
  )}
  </Item.Group>
    </Card.Content>
  </Card>


 </Fragment>
        )
    }
}

export default home
