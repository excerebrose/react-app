import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Alert } from 'react-bootstrap';

import './Signup.css';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      gender: 'male',
      name: '',
      password: '',
      errors: null,
    }
   
    this._handleSubmit = this._handleSubmit.bind(this);
  } 
  _handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/create', { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(this.state),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.error) {
          this.setState({
            errors: data.error,
          });
        }
        else {
          alert(data.status)
          this.setState({
            email: '',
            name: '',
            gender: 'male',
            password: '',
            errors: null,
          })
        }
      });
  }
  render() {
    return (
      <Form horizontal onSubmit={this._handleSubmit}>
        {this.state.errors?
          <Alert bsStyle="danger">
            {this.state.errors}
          </Alert>
          : 
          null
        }
         <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl value={this.state.name} type="name" onChange={(e) => this.setState({name: e.target.value})} required  />
          </Col>
        </FormGroup>

         <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Gender
          </Col>
          <Col sm={10}>
            <FormControl value={this.state.gender} componentClass="select" onChange={(e) => this.setState({gender: e.target.value})}required>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} required pattern=".+@ed.ac.uk"
            title="only @ed.ac.uk Emails allowed"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} required/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button  bsStyle="primary" type="submit">
              Register
            </Button>
          </Col>
        </FormGroup>
      </Form>

    );
  }
}

export default Signup;