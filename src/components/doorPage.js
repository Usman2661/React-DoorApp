import React, { Component } from 'react';
import { Card, Icon, Image ,Button, Comment, Form, Header, Dimmer,Loader, Feed  } from 'semantic-ui-react';
import axios from 'axios';

export class doorPage extends Component {

  state = {
    loggedIn:false,
    id:'',
    Loader:true,
    door: [],
    DoorName:'',
    DoorLocation:'',
    DateTimeCreated:'',
    DoorDocuments:[]
  }

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
   
  } 


    componentDidMount() {

        const loggedIn =  localStorage.getItem('loggedIn');
        this.setState({loggedIn: loggedIn});
      
          if (loggedIn) {
        
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            this.setState({id: id});

            const token =  localStorage.getItem('token');

            axios({
              url: `http://localhost:3000/api/door?id=${id}`,
              method: 'get',
              headers: {
                  'Authorization': 'Bearer '+token,
                  'Content-Type': 'application/json'
              }
            })
              .then(res => {
                const door = res.data.door;
                this.setState({ door: door });
                this.setState({ Loader: false });

                this.setState({DoorName: door.DoorName});
                this.setState({DoorLocation: door.DoorLocation });
                this.setState({DateTimeCreated: door.DateTimeCreated});
              })
              .catch (error => {
                console.log(error);
              })


              axios({
                url: `http://localhost:3000/api/DoorDocument?id=${id}`,
                method: 'get',
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Content-Type': 'application/json'
                }
              })
                .then(res => {
                  const DoorDocuments = res.data.DoorDocuments;
                  console.log(DoorDocuments);
                  this.setState({ DoorDocuments: DoorDocuments });
                  this.setState({ Loader: false });
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

<Card style={{position:'absolute',width:'500px', marginLeft:'350px'}}>

    <Image src='http://localhost:3000/uploads/1575454917638-birenne.jpg' wrapped ui={false} />
    {/* { this.state.door.map(mydoor =>   */}

    <Card.Content>
    {this.state.Loader ? 
     <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      :  null   
      }
    <Card.Header>{this.state.DoorName}</Card.Header>
      <Card.Meta>
    <span className='date'>{this.state.DoorLocation}</span>
      </Card.Meta>
      <Card.Description>
        {this.state.DateTimeCreated}
      </Card.Description>
    </Card.Content>
    
    <Card.Content extra>

      
    <Header as='h3' dividing>
      Documents
    </Header>


<Feed size='large'>
{ this.state.DoorDocuments.map(mydoor =>   

    <Feed.Event>
      <Feed.Label href={mydoor.Document} image='http://localhost:3000/uploads/1575483118931-pdf-icon-vector-3.jpg' />
      <Feed.Content>
        <Feed.Summary>
          <Feed.User href={mydoor.Document} >Document Added</Feed.User> {mydoor.DocumentTitle}
          <Feed.Date>{mydoor.DateTime}</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like href={mydoor.Document}>
            <Icon name='download' />
          </Feed.Like>
        </Feed.Meta>
        <Feed.Meta>
          <Feed.Like >
            <Icon name='delete' />
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
)}
  </Feed>
  


    </Card.Content>
  </Card>


        )
    }
}

export default doorPage
