import classNames from 'classnames';
import React, { Component } from 'react';
import M from 'materialize-css';

class Dashboard extends Component {
  state = {
    userTags: '',
    randomTags: '',
    isValid: true,
    errorMessage: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateTag = tag => {
    const response = {
      invalid: false,
      message: null
    };

    if (!tag.startsWith('#')) {
      response.invalid = true;
      response.message = `${tag} does not start with #`;
    } else if (tag.length <= 1) {
      response.invalid = true;
      response.message = `${tag} is too short`;
    }

    return response;
  };

  validateTags = tags => {
    for (let tag of tags) {
      const response = this.validateTag(tag);
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

  randomizeTags = tags => {
    const shuffled = tags.slice(0);
    let i = tags.length;
    while (i--) {
      const index = Math.floor((i + 1) * Math.random());
      const temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, tags.length);
  };

  onSubmit = e => {
    e.preventDefault();
    const { userTags } = this.state;
    const tags = userTags.split(/(\s+)/).filter(e => e.trim().length > 0);

    if (!this.validateTags(tags)) {
      return;
    }

    const randomTags = this.randomizeTags(tags);
    this.setState({
      randomTags: randomTags.join(' ')
    });
  };

  render() {
    const { randomTags, userTags, isValid, errorMessage } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col l12 m6">
            <h1>Start Randomizing</h1>
            <p className="flow-text">
              TODO: Explain what this app is all about?
            </p>
          </div>
        </div>
        <div className="row">
          <form className="col l12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col m6 s12">
                <i className="material-icons prefix">mode_edit</i>
                <textarea
                  id="userTags"
                  name="userTags"
                  className={classNames('validate materialize-textarea', {
                    invalid: !isValid
                  })}
                  value={userTags}
                  placeholder="#travel #science #photography"
                  onChange={this.onChange}
                  required
                />
                <label htmlFor="userTags">Your Hashtags</label>
                <span className="helper-text" data-error={errorMessage} />
              </div>
              <div className="input-field col m6 s12">
                <textarea
                  disabled
                  value={this.state.randomTags}
                  name="randomTags"
                  id="randomTags"
                  className="materialize-textarea"
                />
                <label
                  htmlFor="randomTags"
                  className={classNames({ active: randomTags !== '' })}
                >
                  Randomized Hashtags
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-large waves-effect waves-light"
            >
              Randomize! <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Dashboard;
