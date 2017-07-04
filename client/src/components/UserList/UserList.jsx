import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class UserList extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    fetch('/api/list', { 
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(!data.errors) {
          this.setState({
            users: data.names
          });
        }
        else {
          console.log(data.errors);
        }
      });
  }

  render() {
    return(
      <div className="user-list">
        <h2> Registered Users </h2>
        {this.state.users?
          <ListGroup>
              { 
                this.state.users.map((user,index) => {
                  return(
                    <ListGroupItem>{user}</ListGroupItem>
                  )
                })
            }
          </ListGroup>
          :
          <h2>No Users Registered</h2>
        }
      </div>
    );
  }
};

export default UserList;
