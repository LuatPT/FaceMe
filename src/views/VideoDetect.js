import React, { Component } from 'react';
import VideoInput from './VideoInput';
class VideoDetect extends Component {
  componentDidMount = () => {
    const { getDataAction} = this.props;
    getDataAction();
  }

  render() {
    const { listDataVideo,addCheckInAction } = this.props;
    return (
      <VideoInput listDataVideo={listDataVideo} addCheckInAction={addCheckInAction} />

    );
  }
}

export default VideoDetect;
