import React, { Component, Fragment } from 'react';
import { Header, Image, Table , Card , Dimmer, Loader, Button , Item, Confirm, Form, Input , Modal} from 'semantic-ui-react';
import axios from 'axios';
export class sitePage extends Component {


    state = {
        loggedIn:false,
        doors: [],
        id:'',
        Loader: true,
        Loader1: true,
        open:false,
        SiteName:'',
        open99: false
      }
    
      constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getSiteDoors = this.getSiteDoors.bind(this);
        this.getSite = this.getSite.bind(this);
        this.viewDoor = this.viewDoor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateSite = this.updateSite.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteDoor = this.deleteDoor.bind(this);
      } 
    componentDidMount() {

        const loggedIn =  localStorage.getItem('loggedIn');
        this.setState({loggedIn: loggedIn});
      
          if (loggedIn) {
        
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            this.setState({id: id});

            this.getSiteDoors();
            this.getSite();
            console.log(this.state.SiteName);
            console.log(this.state.SiteAddressLine1);

           }
          else {
            this.props.history.push('/');
          }
        }

        getSiteDoors(){
            const token =  localStorage.getItem('token');
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            axios({
              url: `http://localhost:3000/api/sitedoors?id=${id}`,
              method: 'get',
              headers: {
                  'Authorization': 'Bearer '+token,
                  'Content-Type': 'application/json'
              }
            })
              .then(res => {
                const door = res.data.Doors;
                this.setState({ doors: door });
                this.setState({ Loader: false });

              })
              .catch (error => {
                console.log(error);
                this.setState({ Loader: false });
              })
        }


        getSite(){
          const token =  localStorage.getItem('token');
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get('id');

          axios({
            url: `http://localhost:3000/api/site?id=${id}`,
            method: 'get',
            headers: {
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            }
          })
            .then(res => {
              const Site = res.data.Site;
              this.setState({ Loader1: false });
  
              this.setState({SiteName: Site.SiteName});
              this.setState({SiteAddressLine1: Site.SiteAddressLine1 });
              this.setState({SiteAddressLine2: Site.SiteAddressLine2});
              this.setState({City: Site.City});
              this.setState({PostCode: Site.PostCode});
              this.setState({Image: Site.Image});

            })
            .catch (error => {
              console.log(error);
              this.setState({ Loader1: false });

            })
      }

      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
      handleCancel1 = () => this.setState({ open99: false })

        viewDoor(id) {
          console.log(this.state.SiteName);
            this.props.history.push(`/mydoor?id=${id}`);
        }

        deleteDoor(id) {
         

        const usertype = localStorage.getItem('usertype');
        if (usertype==='Manager'){
          const doorid=id;
          this.setState({ delete_id: doorid });
          this.setState({ open: true })
        }
        else{
          this.setState({ open99: true })

        }
        }

        updateSite(event){
          event.preventDefault();

            const usertype = localStorage.getItem('usertype');
         if (usertype==='Manager'){

          this.setState({Loader1: true});


          const token = localStorage.getItem('token');


          const options = {
            headers: {
              'Authorization': 'Bearer '+token,
              'Content-Type': 'application/json'
          }
          };

          axios.put('http://localhost:3000/api/updateSite', { 
            id: this.state.id, 
            SiteName: this.state.SiteName,
            SiteAddressLine1: this.state.SiteAddressLine1, 
            SiteAddressLine2: this.state.SiteAddressLine2,
            PostCode: this.state.PostCode,
            City: this.state.City
           },
           options
           )
          .then(res => {
            console.log(res.data);
            this.getSite();
            this.setState({Loader1: false});

          })
          .catch(error => {
            console.log(error);
            console.log(error.message);
            this.setState({Loader1: true});      
          })

         }
         else{
          this.setState({open99: true}); 
         }

      
        }

        handleConfirm(){

          this.setState({ open: false })
          this.setState({ Loader: true })

    
          const doorid = this.state.delete_id;
    
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
              this.getSiteDoors();
              this.setState({ Loader: false })
            })
            .catch (error => {
              console.log(error);
    
              this.setState({ open: false })
            })
    
        }
        handleCancel = () => this.setState({ open: false })


        
    render() {
        return (
       <Fragment>
 <Card style={{position:'absolute',marginLeft:'570px',width:'500px'}}>
    <Card.Content>
    <Confirm
          open={this.state.open}
          header='Delete Door'
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
            <Table basic='very' celled collapsing >
               {this.state.Loader ? 
     <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      :  null   
      } 
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Door</Table.HeaderCell>
        <Table.HeaderCell>Ceated</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>

      </Table.Row>
    </Table.Header>

    <Table.Body>
    { this.state.doors.map(door =>   
      <Table.Row>
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
        <Table.Cell >
       <Button.Group basic size='small'>
       <Button icon='eye'  onClick={() => this.viewDoor(door._id)}/>
    {/* <Button icon='edit' /> */}
    <Button style={{color:'red'}} icon='delete' onClick={() => this.deleteDoor(door._id)} />
  </Button.Group>
       </Table.Cell>
      </Table.Row>
    )}
    </Table.Body>
  </Table>  

  </Card.Content>
  </Card>

  <Card style={{position:'absolute', marginLeft:'10px', width:'550px'}}>
    <Card.Content>
    {this.state.Loader1 ? 
     <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      :  null   
      } 
      <Item.Group divided>
<Item>
  <Item.Image src={this.state.Image} size='medium' style={{marginTop:'30px'}} />

  <Item.Content>

  <Form onSubmit={this.updateSite}>
      <Input icon='users' value={this.state.SiteName} iconPosition='left' onChange={this.handleChange}  name='SiteName' placeholder='Site Name' />
      <Input icon='users' value={this.state.SiteAddressLine1} iconPosition='left' onChange={this.handleChange} name='SiteAddressLine1'  placeholder='Site Address Line 1' />
      <Input icon='users' value={this.state.SiteAddressLine2} iconPosition='left' onChange={this.handleChange} name='SiteAddressLine2' placeholder='Site Address Line 2' />
      <Input icon='users' value={this.state.PostCode} iconPosition='left' onChange={this.handleChange} name='PostCode' placeholder='Post Code' />
      <Input icon='users' value={this.state.City} iconPosition='left' onChange={this.handleChange} name='City' placeholder='City' />
        {/* <label>Site Image</label>
         <input type="file" id="image" accept="image/png, image/jpeg"  onChange={this.handleImageChange} /> */}

    <Button secondary type='submit'>Save Changes</Button>
  </Form>
  </Item.Content>
</Item>


</Item.Group>
    </Card.Content>

  </Card>
  <Modal  open={this.state.open99}>
      <Header icon='lock' content='Un-Authorised' />
      <Modal.Content>
        <p>
          You dont have permissions to delete the door
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.handleCancel1}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>


</Fragment>


        )
    }
}

export default sitePage
