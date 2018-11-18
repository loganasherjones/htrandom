import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { firebase, history } = this.props;
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => alert('Invalid Login Credentials'));

    history.push('/');
  };

  render() {
    return (
      <div className="row">
        <h3>Login</h3>
        <form onSubmit={this.onSubmit} className="col s12">
          <div className="row">
            <div className="input-field col s12 m6">
              <i className="material-icons prefix">email</i>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={this.state.email}
                onChange={this.onChange}
                className="validate"
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="input-field col s12 m6">
              <i className="material-icons prefix">lock</i>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={this.state.password}
                onChange={this.onChange}
                className="validate"
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <p>
            Don't have an account?{' '}
            <Link to="/register">Create your acccount</Link>
          </p>
          <div className="row">
            <div className="col s12 m3">
              <button className="btn btn-large waves-effect waves-light flow">
                Login
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
