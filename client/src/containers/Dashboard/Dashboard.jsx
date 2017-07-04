import React, { Component } from 'react';
import Login from '../../components/Login/Login';
import { connect } from 'react-redux';
import { onLogout } from '../../actions/authenticate';

class Dashboard extends Component {
  render() {
    return (
      <div className='dashboard-page home-page'>
        {
          !this.props.isAuthenticated?
          <Login />
          :
          <div className='dashboard-page--profile'>
            <h3>{`${this.props.user.name}'s Profile`}</h3>
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
