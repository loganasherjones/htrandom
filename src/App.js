import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './utils/auth';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import Groups from './components/groups/Groups';
import AddGroup from './components/groups/AddGroup';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';
import './App.css';
import GroupListEdit from './components/groups/GroupListEdit';
import EditGroup from './components/groups/EditGroup';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route
                  exact
                  path="/groups"
                  component={UserIsAuthenticated(Groups)}
                />
                <Route
                  exact
                  path="/groups/add"
                  component={UserIsAuthenticated(AddGroup)}
                />
                <Route
                  exact
                  path="/groups/edit"
                  component={UserIsAuthenticated(GroupListEdit)}
                />
                <Route
                  exact
                  path="/groups/edit/:id"
                  component={UserIsAuthenticated(EditGroup)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
