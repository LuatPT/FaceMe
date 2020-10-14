import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>LuatPT Facial Recognition App</h2>
        <li>
          <Link to="/input">Insert Image</Link>
        </li>
        <li>
          <Link to="/photo">Photo Input</Link>
        </li>
        <li>
          <Link to="/camera">Video Camera</Link>
        </li>
      </div>
    );
  }
}
