import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { validateTag } from '../../utils/tags';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

class AddGroup extends Component {
  state = {
    title: '',
    tags: '',
    isValid: true,
    errorMessage: ''
  };

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
    const { tags, title } = this.state;
    const { auth, firestore, history } = this.props;
    const tagArray = tags.split(/(\s+)/).filter(e => e.trim().length > 0);

    if (!this.validateTags(tagArray)) {
      return;
    }

    const newGroup = {
      userId: auth.uid,
      title: title,
      tags: tagArray
    };

    firestore
      .add({ collection: 'groups' }, newGroup)
      .then(() => history.push('/groups'));
  };

  render() {
    const { title, tags, isValid, errorMessage } = this.state;
    return (
      <div>
        <h4>Add a new group</h4>
        <div className="row">
          <form className="col l12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={this.onChange}
                  value={title}
                  className="validate"
                  required
                />
                <label htmlFor="title">Title</label>
              </div>
              <div className="input-field col s12">
                <textarea
                  id="tags"
                  name="tags"
                  className={classNames('validate materialize-textarea', {
                    invalid: !isValid
                  })}
                  value={tags}
                  placeholder="#travel #science #photography"
                  onChange={this.onChange}
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
              Create Group<i className="material-icons right">add</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

AddGroup.propTypes = {
  firestore: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AddGroup);
