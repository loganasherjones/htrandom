import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class RandomTags extends Component {
  state = {
    copyMessage: ''
  };

  copyToClipboard = () => {
    this.randomTextArea.select();
    document.execCommand('copy');
    this.setState({ copyMessage: 'Copied!' });
  };

  render() {
    const { copyMessage } = this.state;
    const { randomTags } = this.props;

    return (
      <div className="input-field col m6 s12">
        <i
          className="material-icons prefix"
          onClick={this.copyToClipboard}
          style={{ cursor: 'pointer' }}
        >
          content_copy
        </i>
        <textarea
          readOnly
          onChange={() => {}}
          value={randomTags}
          name="randomTags"
          id="randomTags"
          className="materialize-textarea"
          ref={textarea => (this.randomTextArea = textarea)}
        />
        <label
          htmlFor="randomTags"
          className={classNames({ active: randomTags !== '' })}
        >
          Randomized Hashtags
        </label>
        <span className="helper-text">{copyMessage}</span>
      </div>
    );
  }
}

RandomTags.propTypes = {
  randomTags: PropTypes.string.isRequired
};

export default RandomTags;
