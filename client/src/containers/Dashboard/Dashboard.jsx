import React, { Component } from 'react';
import Login from '../../components/Login/Login';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { onLogout } from '../../actions/authenticate';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this._handleLogout = this._handleLogout.bind(this);
  };

  _handleLogout= () => {
     fetch('/api/logout', { 
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      }).then((res) => {
        return res.json();
      })
      .then((data) => {
        if(!data.errors) {
          alert("Logout sucessful!");
          this.props.onLogout();
        }
        else {
          console.log(data.errors);
        }
      });
  }

  render() {
    return (
      <div className='dashboard-page home-page'>
        {
          !this.props.isAuthenticated?
          <Login />
          :
          <div className='dashboard-page--profile'>
            <h3>{`${this.props.user.name}'s Profile`}</h3>
            <Button bsStyle="default" bsSize="large" onClick={this._handleLogout}>Logout</Button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    isAuthenticated: state.authenticate.isAuthenticated,
    user: state.authenticate.user,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onLogout: () => dispatch(onLogout()),
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
