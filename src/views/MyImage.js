import React, { Component } from 'react';

export default class MyImage extends Component {
  render() {
    const { imageURL, drawBox } = this.props;
    return (
      <div style={{ position: 'relative' }} >
        <div style={{ position: 'absolute' }}>
          <img id="imgDetect" src={imageURL} alt="imageURL" width="480px" height="480px"/>
        </div>
        {!!drawBox ? drawBox : null}
      </div>
    );
  }
}
