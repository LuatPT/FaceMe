import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Facial Recognition</h2>
        <li>
          <Link to="/input">Input Data To Train Model</Link>
        </li>
        <li>
          <Link to="/photo">Detect Photo</Link>
        </li>
        <li>
          <Link to="/camera">Detect Video</Link>
        </li>
      </div>
    );
  }
}
