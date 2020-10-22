import React, { Component } from 'react';
import VideoInput from './VideoInput';
class VideoDetect extends Component {
  componentDidMount = () => {
    const { getDataVideo, listDataVideo } = this.props;
    getDataVideo.getDataAction();
  }

  render() {
    const { listDataVideo } = this.props;
    return (
      <VideoInput listDataVideo={listDataVideo} />

    );
  }
}

export default VideoDetect;
