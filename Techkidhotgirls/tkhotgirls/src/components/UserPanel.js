import React, { Component } from 'react';

class UserPanel extends Component {
  render() {
    return (
      <div className="UserPanel">
        <button className="UserPanel_button">
          <span className="glyphicon glyphicon-camera"></span>
        </button>
        <button className="UserPanel_button">
          <span className="glyphicon glyphicon-menu-hamburger"></span>
        </button>
        <div className="UserPanel_username">
          Maruusha
        </div>
      </div>
    );
  }
}

export default UserPanel;
