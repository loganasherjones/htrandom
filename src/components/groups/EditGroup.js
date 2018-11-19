import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { validateTag } from '../../utils/tags';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';

class EditGroup extends Component {
  state = {
    isValid: true,
    errorMessage: ''
  };

  constructor(props) {
    super(props);

    this.titleInput = React.createRef();
    this.tagsInput = React.createRef();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  validateTags = tags => {
    for (let tag of tags) {
      const response = validateTag(tag);
      if (response.invalid) {
        this.setState({
          isValid: false,
          errorMessage: response.message
        });
        return false;
      }
    }
    return true;
  };

  onSubmit = e => {
    e.preventDefault();
    const title = this.titleInput.current.value;
    const tags = this.tagsInput.current.value;
    const { auth, firestore, history, group } = this.props;
    const tagArray = tags.split(/(\s+)/).filter(e => e.trim().length > 0);

    if (!this.validateTags(tagArray)) {
      return;
    }

    const updatedGroup = {
      userId: auth.uid,
      title: title,
      tags: tagArray
    };

    console.log('TODO: update this.');
    console.log(updatedGroup);
    firestore
      .update({ collection: 'groups', doc: group.id }, updatedGroup)
      .then(history.push('/groups'));
  };

  render() {
    const { group } = this.props;
    const { isValid, errorMessage } = this.state;
    if (group) {
      return (
        <div>
          <h4>Edit Group</h4>
          <div className="row">
            <form className="col l12" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    ref={this.titleInput}
                    defaultValue={group.title}
                    className="validate"
                    required
                  />
                  <label htmlFor="title" className="active">
                    Title
                  </label>
                </div>
                <div className="input-field col s12">
                  <textarea
                    id="tags"
                    name="tags"
                    className={classNames('validate materialize-textarea', {
                      invalid: !isValid
                    })}
                    defaultValue={group.tags.join(' ')}
                    placeholder="#travel #science #photography"
                    ref={this.tagsInput}
                    required
                  />
                  <label className="active" htmlFor="tags">
                    Your Hashtags
                  </label>
                  <span className="helper-text" data-error={errorMessage} />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-large waves-effect waves-light"
              >
                Update Group<i className="material-icons right">save</i>
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditGroup.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    { collection: 'groups', storeAs: 'group', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, firebase, props }) => ({
    group: ordered.group && ordered.group[0],
    auth: firebase.auth
  }))
)(EditGroup);
