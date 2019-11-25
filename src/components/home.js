import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';

export class home extends Component {
    state = { users: [] };

    componentDidMount() {

      const loggedIn =  localStorage.getItem('loggedIn');
      if (loggedIn){


        // axios.get(`http://localhost:3000/api/user/users`)
        // .then(res => {
        //    // console.log(res);
        //    // console.log(res.data.users);
        //   const users = res.data.users;
        //   this.setState({ users });
        // })

      }
      else {
        this.props.history.push('/');
      }
    }

    render() {
        return (
   <h1>Welcome to the Homepage</h1>
        )
    }
}

export default home
