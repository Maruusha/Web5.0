import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPanel from './UserPanel';
import SearchBar from './SearchBar';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <SearchBar />
            </div>
            <div className="col-sm-6">
              <img src="http://techkids.vn/images/TechkidBrandColor.png" alt="techkids Logo" className="logo"/>
              HOT GIRLs
            </div>
            <div className="col-sm-3">
              <UserPanel />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
