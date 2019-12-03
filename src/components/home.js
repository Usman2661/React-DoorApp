import React, { Component, Fragment } from 'react';
import { Button, Checkbox, Icon, Table , Statistic, Image , Label , Item } from 'semantic-ui-react';
import axios from 'axios';

export class home extends Component {
     state = { doors: [] };

    componentDidMount() {

      const loggedIn =  localStorage.getItem('loggedIn');
      if (loggedIn){
        const token =  localStorage.getItem('token');

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

              })
              .catch (error => {
                console.log(error);
              })
      }
      else {
        this.props.history.push('/');
      }
    }
    render() {
        return (
          <Fragment>
          <Statistic.Group widths='four'>
          <Statistic>
            <Statistic.Value>
              <Icon name='building' />5
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
              <Icon name='building' />5
            </Statistic.Value>
            <Statistic.Label>Total Sites</Statistic.Label>
          </Statistic>
      
          <Statistic>
            <Statistic.Value>
              <Icon name='building' />
            </Statistic.Value>
            <Statistic.Label>Site with most doors</Statistic.Label>
          </Statistic>


        </Statistic.Group>
   <Table compact celled definition>
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
       <Button icon='eye' />
    <Button icon='edit' />
    <Button icon='delete' />
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

   <Table.Footer fullWidth>
     <Table.Row>
       <Table.HeaderCell />
       <Table.HeaderCell colSpan='4'>
         <Button
           floated='right'
           icon
           labelPosition='left'
           primary
           size='small'
         >
           <Icon name='file' /> Add Door
         </Button>
       </Table.HeaderCell>
     </Table.Row>
   </Table.Footer>
 </Table> 


 <Item.Group divided>
    <Item>
      <Item.Image src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>12 Years a Slave</Item.Header>
        <Item.Meta>
          <span className='cinema'>Union Square 14</span>
        </Item.Meta>
        <Item.Description></Item.Description>
        <Item.Extra>
          <Label>IMAX</Label>
          <Label icon='globe' content='Additional Languages' />
        </Item.Extra>
      </Item.Content>
    </Item>
    
    <Item>
      <Item.Image src='/images/wireframe/image.png' />
      <Item.Content>
        <Item.Header as='a'>My Neighbor Totoro</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC Cinema</span>
        </Item.Meta>
        <Item.Description></Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Buy tickets
            <Icon name='right chevron' />
          </Button>
          <Label>Limited</Label>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src='/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Watchmen</Item.Header>
        <Item.Meta>
          <span className='cinema'>IFC</span>
        </Item.Meta>
        <Item.Description></Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Buy tickets
            <Icon name='right chevron' />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
 </Fragment>
        )
    }
}

export default home
