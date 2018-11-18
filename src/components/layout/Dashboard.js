import classNames from 'classnames';
import React, { Component } from 'react';
import RandomTags from '../layout/RandomTags';
import { randomizeTags, validateTag } from '../../utils/tags';

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
    const { userTags } = this.state;
    const tags = userTags.split(/(\s+)/).filter(e => e.trim().length > 0);

    if (!this.validateTags(tags)) {
      return;
    }

    const randomTags = randomizeTags(tags);
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
            <p className="flow-text">
              Fill out the hashtags on the left, and click randomize! If you
              want to create groups, just login and you can manage your own
              groups and randomize at different percentages.
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
                <label className="active" htmlFor="userTags">
                  Your Hashtags
                </label>
                <span className="helper-text" data-error={errorMessage} />
              </div>
              <RandomTags randomTags={randomTags} />
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
