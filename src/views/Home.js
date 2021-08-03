import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div >
        <h2>Facial Recognition</h2>
        <ul className="list-group" >
          <li className="list-group-item">
            <Link to="/input">Input Data To Train Model</Link>
          </li>
          <li className="list-group-item">
            <Link to="/photo">Detect Photo</Link>
          </li>
          <li className="list-group-item">
            <Link to="/camera">Detect Video</Link>
          </li>
        </ul>
      </div>
    );
  }
}
