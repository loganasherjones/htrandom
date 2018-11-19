import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import M from 'materialize-css';

class Navbar extends Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    M.Sidenav.init(this.sidenav);
  }

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;

    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    return (
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            #Randomizer
          </Link>
          <a href="#!" data-target="mobile-nav" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {isAuthenticated ? (
              <li>
                <Link to="/groups">Groups</Link>
              </li>
            ) : null}
            {isAuthenticated ? (
              <li>
                <a href="#!" onClick={this.onLogoutClick}>
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

        <ul
          className="sidenav"
          id="mobile-nav"
          ref={sidenav => (this.sidenav = sidenav)}
        >
          {isAuthenticated ? (
            <li>
              <Link to="/groups" className="sidenav-close">
                Groups
              </Link>
            </li>
          ) : null}
          {isAuthenticated ? (
            <li>
              <a
                href="#!"
                onClick={this.onLogoutClick}
                className="sidenav-close"
              >
                Logout
              </a>
            </li>
          ) : (
            <li>
              <Link to="/login" className="sidenav-close">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
