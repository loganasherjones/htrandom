import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardGroup extends Component {
  state = {
    selected: false,
    id: '',
    title: ''
  };

  render() {
    const { group, selected, toggle } = this.props;
    return (
      <div className="col s12 m4 clickme" onClick={() => toggle(group.id)}>
        <div className="card-panel">
          <h5>
            {group.title}
            <i className="material-icons right">
              {selected ? 'check_box' : 'check_box_outline_blank'}
            </i>
          </h5>
        </div>
      </div>
    );
  }
}

CardGroup.propTypes = {
  group: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default CardGroup;
