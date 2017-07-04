import React, { Component } from 'react';
import { Grid , Row, Col } from 'react-bootstrap';
import Signup from '../../components/Signup/Signup';
import UserList from '../../components/UserList/UserList';

import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className='home-page'>
        <Grid>
          <Row>
            <Col sm={12} md={6}>
              <Signup />
            </Col>
            <Col sm={12} md={6}>
              <UserList />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
