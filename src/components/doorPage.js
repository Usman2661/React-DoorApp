import React, { Component } from 'react';
import { Card, Icon, Image ,Button, Comment, Form, Header, Dimmer,Loader, Feed, Modal } from 'semantic-ui-react';
import axios from 'axios';

export class doorPage extends Component {

  state = {
    loggedIn:false,
    id:'',
    Loader:true,
    Loader1:false,
    door: [],
    DoorName:'',
    DoorLocation:'',
    DateTimeCreated:'',
    DoorDocuments:[],
    open:false,
    document:null,
    DocumentTitle:''
  }

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.getDoorDocuments = this.getDoorDocuments.bind(this);  
    this.uploadDocument = this.uploadDocument.bind(this);

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
                console.log(door);
                this.setState({ door: door });
                this.setState({ Loader: false });

                this.setState({DoorName: door.DoorName});
                this.setState({DoorLocation: door.DoorLocation });
                this.setState({DateTimeCreated: door.DateTimeCreated});
                this.setState({DoorImage: door.Image});

              })
              .catch (error => {
                console.log(error);
                this.setState({ Loader: false });
              })

              this.getDoorDocuments();

              var currentDateTime = new Date();
              var date = currentDateTime.getFullYear() + '-' + (currentDateTime.getMonth()+1) + '-' + currentDateTime.getDate() +' '+ currentDateTime.getHours()+':'+ currentDateTime.getMinutes()+':'+ currentDateTime.getSeconds();

              this.setState({datetime: date});
      
           }
          else {
            this.props.history.push('/');
          }
        }

        getDoorDocuments(){
          
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get('id');
          const token =  localStorage.getItem('token');

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
              this.setState({ Loader: false });
            })
        }

        handleChange(event) {
          this.setState({[event.target.name]: event.target.value});

          console.log(this.state.DocumentTitle);
        }
  
        handleDocumentChange = (e) => {
          this.setState({
            document: e.target.files[0]
          })
        };
   

      toggle = () => {
        this.setState({
          open: !this.state.open
        });
      }

      uploadDocument(event){

          this.setState({ Loader1:true});

          event.preventDefault();
          const token =  localStorage.getItem('token');

          let form_data = new FormData();
          form_data.append('document', this.state.document, this.state.document.name);
          form_data.append('DocumentTitle', this.state.DocumentTitle);
          form_data.append('DoorID', this.state.id);
          form_data.append('DateTime', this.state.datetime);

          let url = 'http://localhost:3000/api/upload';
  
          axios.post(url, form_data, {
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization': 'Bearer '+token
            }
          })
         .then(res => {
            console.log(res);
            console.log(res.data.message);
            this.setState({  Loader1: false });
            this.setState({
              open: !this.state.open
            });
            this.getDoorDocuments();
         
        })
        .catch(error => {
            console.log(error);
      
        })

      }
    render() {
        return (

<Card style={{position:'absolute',width:'500px', marginLeft:'350px'}}>

    <Image src={this.state.DoorImage} wrapped ui={false} />
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
    <Button
           floated='middle'
           icon
           labelPosition='left'
           secondary
           size='medium'
           onClick={this.toggle}
           >
           <Icon name='file' /> Add Document
         </Button>

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
  <Modal size='medium' open={this.state.open} onClose={this.close}>
  {this.state.Loader1 ? 
     <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      :  null   
      }
          <Modal.Header>Add Document</Modal.Header>
          <Modal.Content>
          <Form onSubmit={this.uploadDocument}>

<Form.Field >
  <label> Document Title </label>
  <input type='text' placeholder='Document Title'
        name="DocumentTitle"   value={this.state.DocumentTitle} onChange={this.handleChange}
   required/>
</Form.Field>

<Form.Field >
  <label> File  </label>
  <input type="file"
  id="files"
  onChange={this.handleDocumentChange} required/>
</Form.Field>

<Button type='submit'>Add Document</Button>
</Form>

          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.toggle}>No</Button>
            <Button type='submit'
              positive
              icon='checkmark'
              labelPosition='right'
              content='Add Document'
            />
          </Modal.Actions>
        </Modal>
<br/>
<br/>
    </Card.Content>
  </Card>


        )
    }
}

export default doorPage
