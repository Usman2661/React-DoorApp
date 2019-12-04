import React, { Component } from 'react'

export class doorPage extends Component {



    componentDidMount() {

        const loggedIn =  localStorage.getItem('loggedIn');
        this.setState({loggedIn: loggedIn});
      
      
        
          if (loggedIn) {
            //   const token =  localStorage.getItem('token');
            //   const id =  localStorage.getItem('userId');

            console.log(this.props.location.query.id)

           }
          else {
            this.props.history.push('/');
          }
        }

    render() {
        return (
            <div>
                <h1> Welcome to my Door</h1>
            </div>
        )
    }
}

export default doorPage
