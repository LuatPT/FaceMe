import React, { Component } from 'react';
import ImageInput from './ImageInput';
class Detect extends Component {
  componentDidMount = async () => {
    const { getDataAction } = this.props;
    await getDataAction();
  }
  render() {
    const { listData } = this.props;
    return (
      <ImageInput listData={listData} />
    );
  }
}

export default Detect;
