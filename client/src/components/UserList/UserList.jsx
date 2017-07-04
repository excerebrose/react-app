import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

class UserList extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: null,
    };
    this._handleFetch = this._handleFetch.bind(this);
  }

  _handleFetch() {
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
  componentDidMount() {
    this._handleFetch();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.reload !== this.props.reload)
      this._handleFetch();
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
                    <ListGroupItem key={index}>{user}</ListGroupItem>
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

const mapStateToProps = (state) => (
  {
    reload: state.reload,
  }
);

export default connect(mapStateToProps, null)(UserList);
