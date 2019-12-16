import React, { Component } from 'react';
import { Card, Icon, Image ,Button, Confirm, Form, Header, Dimmer,Loader, Feed, Modal } from 'semantic-ui-react';
import axios from 'axios';
import '../css/doorPage.css';

export class doorPage extends Component {

  state = {
    loggedIn:false,
    id:'',
    Loader:true,
    Loader1:false,
    Loader2:false,
    door: [],
    DoorName:'',
    DoorLocation:'',
    DateTimeCreated:'',
    DoorDocuments:[],
    open:false,
    document:null,
    DocumentTitle:'',
    open1: false,
    open99: false
  }

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.getDoorDocuments = this.getDoorDocuments.bind(this);  
    this.uploadDocument = this.uploadDocument.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.viewDocument = this.viewDocument.bind(this);
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

        }
  
        handleDocumentChange = (e) => {
          this.setState({
            document: e.target.files[0]
          })
        };
   

      toggle1 = () => {
    
        const usertype = localStorage.getItem('usertype');
        if (usertype==='Manager'){
          this.setState({
            open: !this.state.open
          });
        }
        else{
          this.setState({
            open99: true
          });
        }
      
      }

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

      handleCancel = () => this.setState({ open1: false })
      handleCancel1 = () => this.setState({ open99: false })


      handleDelete(){

        this.setState({ open1: false })
        this.setState({ Loader2: true })


        const token = localStorage.getItem('token');
        axios({
          url: 'http://localhost:3000/api/delete',
          method: 'delete',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          data: {
            id:this.state.doc_id,
            docpath:this.state.docpath
          }
        })
          .then(res => {
            const door = res.data.message;
            console.log(door);
            this.getDoorDocuments();
            this.setState({ Loader2: false })
          })
          .catch (error => {
            console.log(error);
            this.getDoorDocuments();
            this.setState({ Loader2: false })
          })
      }

      deleteDocument(id,document) {

        const usertype = localStorage.getItem('usertype');

        if(usertype==='Manager'){
          var parts = document.split('.com/', 2);
          var docpath  = parts[1];
          
          this.setState({  doc_id: id });
          this.setState({  docpath: docpath });
  
          this.setState({  open1: true });
        }
        else{
          this.setState({  open99: true });

        }
      }

      viewDocument(document) {

        console.log(document);

        const extension = document.substring(document.lastIndexOf(".") + 1);

        console.log(extension);

        this.props.history.push({
          pathname: '/doc',
          document: document,
          filetype: extension
        })

      }


    render() {
        return (

<Card className='documentCard'>

    <Image size='medium' className='doorImage' src={this.state.DoorImage} wrapped  />
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
           onClick={this.toggle1}
           >
           <Icon name='file' /> Add Document
         </Button>
         {this.state.Loader2 ? 
     <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      :  null   
      }
<Feed size='large'>
{ this.state.DoorDocuments.map(mydoor =>   

      <Feed.Event>
        {mydoor.Document.includes('.pdf') || mydoor.Document.includes('.PDF')  ? 
        <Feed.Label href={mydoor.Document} 
        image='http://localhost:3000/uploads/1575483118931-pdf-icon-vector-3.jpg' 
        />
      :  null   
      }
        {mydoor.Document.includes('.docx')  || mydoor.Document.includes('.DOCX')   ? 
        <Feed.Label href={mydoor.Document} 
        image='http://localhost:3000/uploads/word.png' 
        />
      :  null   
      }
        {mydoor.Document.includes('.png')  || mydoor.Document.includes('.PNG')  || mydoor.Document.includes('.jpg')  || mydoor.Document.includes('.JPG')   || mydoor.Document.includes('.JPEG')  || mydoor.Document.includes('.jpeg')  ? 
        <Feed.Label href={mydoor.Document} 
        image='http://localhost:3000/uploads/file.png' 
        />
      :  null   
      }
        {mydoor.Document.includes('.csv')  || mydoor.Document.includes('.CSV')   || mydoor.Document.includes('.xlsx')  || mydoor.Document.includes('.XLSX')  || mydoor.Document.includes('.XLS') || mydoor.Document.includes('.xls') ? 
        <Feed.Label href={mydoor.Document} 
        image='http://localhost:3000/uploads/excel.png' 
        />
      :  null   
      }

     
     
   
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
          <Feed.Like onClick={() => this.viewDocument(mydoor.Document)} >
            <Icon name='eye' />
          </Feed.Like>
        </Feed.Meta>
        <Feed.Meta>
          <Feed.Like  onClick={() => this.deleteDocument(mydoor._id,mydoor.Document)} >
            <Icon name='delete' />
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
)}
<Confirm
          open={this.state.open1}
          header='Delete Document'
          onCancel={this.handleCancel}
          onConfirm={this.handleDelete}
        />
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

{/* <Button primary type='submit'>Add Document</Button> */}
</Form>

          </Modal.Content>
          <Modal.Actions>
            <Button negative icon='cancel' onClick={this.toggle}>Cancel</Button>
            <Button type='submit'
              positive
              icon='cloud upload'
              labelPosition='right'
              content='Add Document'
              onClick={this.uploadDocument}
            />
          </Modal.Actions>
        </Modal>
<br/>
<br/>
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
    </Card.Content>
  </Card>


        )
    }
}

export default doorPage
