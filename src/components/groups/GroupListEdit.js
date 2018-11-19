import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';
import RandomTags from '../layout/RandomTags';
import CardGroup from './CardGroup';

class GroupListEdit extends Component {
  browse = id => {
    this.props.history.push(`/groups/edit/${id}`);
  };
  render() {
    const { groups } = this.props;

    if (groups) {
      return (
        <div>
          <h3>Select Group to Edit</h3>
          <div className="row">
            {groups.map(group => (
              <CardGroup
                key={group.id}
                group={group}
                selected={false}
                toggle={this.browse}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

GroupListEdit.propTypes = {
  firestore: PropTypes.object.isRequired,
  groups: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'groups' }]),
  connect((state, props) => ({
    groups: state.firestore.ordered.groups
  }))
)(GroupListEdit);
