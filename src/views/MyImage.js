import React, { Component } from 'react';

export default class MyImage extends Component {
  render() {
    const { imageURL, drawBox, listData } = this.props;
    // console.log(listData);
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
