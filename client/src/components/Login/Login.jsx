import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { onLogin } from '../../actions/authenticate';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: null,
    }
   
    this._handleSubmit = this._handleSubmit.bind(this);
  } 
  _handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/login', { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({email: this.state.email, password: this.state.password}),
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
          this.props.onLogin(data);
        }
      });
  }
  render() {
    return (
      <div className="Login-form" >
      <h2> Login form </h2>
      <Form horizontal onSubmit={this._handleSubmit}>
        {this.state.errors?
          <Alert bsStyle="danger">
            {this.state.errors}
          </Alert>
          : 
          null
        }
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
            <Button  
              bsStyle="primary" 
              type="submit"
              bsSize="large"
              block
              >
              Login
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    onLogin: (payload) => dispatch(onLogin(payload)),
  }
)
export default connect(null, mapDispatchToProps)(Login);