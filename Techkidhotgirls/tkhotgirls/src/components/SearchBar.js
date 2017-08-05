import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <form className="SearchBar">
        <input type="text" className="form-control" placeholder="Enter your search here" />
        <span className="glyphicon glyphicon-search"></span>
      </form>
    );
  }
}

export default SearchBar;
