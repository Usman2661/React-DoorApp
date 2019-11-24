import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';

export class home extends Component {
    state = { users: [] };

    componentDidMount() {
        axios.get(`http://localhost:3000/api/user/users`)
      .then(res => {
         // console.log(res);
         // console.log(res.data.users);
        const users = res.data.users;
        this.setState({ users });
      })
    }

    render() {
        return (
            <MDBTable striped>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>UserType</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              { this.state.users.map(user =>
                <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.usertype}</td>
                </tr>
                )}   
            </MDBTableBody>
          </MDBTable>
          
        )
    }
}

export default home
