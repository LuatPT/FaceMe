import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MyImage extends Component {
  render() {
    const { imageURL, drawBox } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <img src={imageURL} alt="imageURL" />
        </div>
        {!!drawBox ? drawBox : null}
      </div>
    );
  }
}
