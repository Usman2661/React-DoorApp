import React, { Component, Fragment } from 'react'
import { Button, Form ,Modal , Input, Card , Image} from 'semantic-ui-react';
import axios from 'axios';
import '../css/site.css';

   
export class Site extends Component {

        state = {
            SiteName: '',
            SiteAddressLine1:'',
            SiteAddressLine2:'',
            PostCode:'', 
            City:'',
            image: null,
            modal: false,
            message:''
          };

    componentDidMount() {
        const loggedIn =  localStorage.getItem('loggedIn');
        const usertype =  localStorage.getItem('usertype');

        if (loggedIn){
            if(usertype!=='Manager'){
                this.props.history.push('/permission');
            }
        }
        else {
          this.props.history.push('/');
        }
      }

      constructor(props) {
        super(props);
        this.state = {
          SiteName: '',
          SiteAddressLine1:'',
          SiteAddressLine2:'',
          PostCode:'', 
          City:'',
          image:null,
          modal: false,
          message:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.createSite = this.createSite.bind(this);

      }
      

      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }

      handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };
 

      toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

      createSite(event){

          event.preventDefault();
          const token =  localStorage.getItem('token');

          let form_data = new FormData();
          form_data.append('file', this.state.image, this.state.image.name);
          form_data.append('SiteName', this.state.SiteName);
          form_data.append('SiteAddressLine1', this.state.SiteAddressLine1);
          form_data.append('SiteAddressLine2', this.state.SiteAddressLine2);
          form_data.append('PostCode', this.state.PostCode);
          form_data.append('City', this.state.City);

          let url = 'http://localhost:3000/api/site';
  
          axios.post(url, form_data, {
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization': 'Bearer '+token
            }
          })
         .then(res => {
            console.log(res);
            console.log(res.data.message);
            this.setState({message: "Site Created Succesfully!!"});
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
        
    render() {
        return (
          <Fragment>

<div className='headerCreateSitePage'>

<Image src='http://localhost:3000/uploads/icon.PNG' size='tiny'  verticalAlign='middle' />
    <span style={{fontSize:'25px',fontWeight:'bold'}}> Create Site</span>
</div>

<Card className='newSiteCard'> 
 <Card.Content>
 <Form onSubmit={this.createSite}>
  <Input className='siteName'  icon='building outline' iconPosition='left' type='text' placeholder='Site Name'
       name="SiteName"   value={this.state.SiteName} onChange={this.handleChange}
   required/>

  <Input className='siteAddressLine1'  icon='location arrow' iconPosition='left' type='text' placeholder='Site Address Line 1'
       name="SiteAddressLine1"   value={this.state.SiteAddressLine1} onChange={this.handleChange}
   required/>

  <Input className='siteAddressLine2'  icon='location arrow' iconPosition='left' type='text' placeholder='Site Address Line 2'
       name="SiteAddressLine2"   value={this.state.SiteAddressLine2} onChange={this.handleChange}/>

  <Input className='sitePostCode'  icon='home' iconPosition='left' type='text' placeholder='Post Code'
       name="PostCode"   value={this.state.PostCode} onChange={this.handleChange}
   required/>

  <Input className='siteCity'  icon='address book outline' iconPosition='left'  type='text' placeholder='City'
       name="City"   onChange={this.handleChange}
   required/>

  <Input className='newSiteImage' type="file"
  id="image"
  accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>


<Button className='createSiteButton' secondary type='submit'>Create Site</Button>

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
      {/* <Button positive onClick={this.loginPage}>Login Now</Button> */}

    </Modal.Actions>
  </Modal>
  </Fragment>


        )
    }
}

export default Site
