import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';
import RandomTags from '../layout/RandomTags';
import { randomizeTags } from '../../utils/tags';
import CardGroup from './CardGroup';

class Groups extends Component {
  state = {
    randomTags: '',
    selectedGroups: []
  };

  randomize = () => {
    const { groups } = this.props;
    const { selectedGroups } = this.state;

    const tags = groups
      .filter(g => selectedGroups.indexOf(g.id) !== -1)
      .reduce((a, b) => a.concat(b.tags), []);

    const randomTags = randomizeTags(tags);
    this.setState({ randomTags: randomTags.join(' ') });
  };

  toggleGroup = id => {
    const { selectedGroups } = this.state;
    const newGroups = selectedGroups.filter(g => g !== id);
    if (newGroups.length === selectedGroups.length) {
      this.setState({ selectedGroups: [id, ...selectedGroups] });
    } else {
      this.setState({ selectedGroups: newGroups });
    }
  };

  toggleConfiguration = () => {
    console.log('TODO: Toggle the configuration.');
  };

  render() {
    const { groups } = this.props;
    const { randomTags, selectedGroups } = this.state;

    if (groups) {
      return (
        <div>
          <h3>
            Select your groups
            <Link to="/groups/add" className="btn btn-lg blue right">
              Create a group
              <i className="material-icons right">add</i>
            </Link>
          </h3>
          <div className="row">
            {groups.map(group => (
              <CardGroup
                key={group.id}
                group={group}
                selected={selectedGroups.indexOf(group.id) !== -1}
                toggle={this.toggleGroup}
              />
            ))}
          </div>
          <div className="row">
            <div className="col s12 m3">
              <button
                onClick={this.toggleConfiguration}
                className="btn btn-large waves-effect waves-light grey"
              >
                Configure <i className="material-icons right">settings</i>
              </button>
            </div>
            <div className="col s12 m3 right">
              <button
                onClick={this.randomize}
                className="btn btn-large waves-effect waves-light"
              >
                Randomize! <i className="material-icons right">swap_calls</i>
              </button>
            </div>
            <RandomTags randomTags={randomTags} />
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Groups.propTypes = {
  firestore: PropTypes.object.isRequired,
  groups: PropTypes.array
};

const mapStateToProps = state => {
  const { groups } = state.firestore.ordered;
  return {
    groups: groups ? groups.map(g => ({ ...g, selected: false })) : groups
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  firestoreConnect([{ collection: 'groups' }]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Groups);
