import React, { Component } from 'react';
import VideoInput from './VideoInput';
class VideoDetect extends Component {
  componentDidMount = () => {
    const { getDataAction} = this.props;
    getDataAction();
  }

  render() {
    const { listDataVideo,addCheckInAction, getcheckInListAction, listCheckIn } = this.props;
    return (
      <VideoInput listDataVideo={listDataVideo} listCheckIn ={listCheckIn} addCheckInAction={addCheckInAction} getcheckInListAction={getcheckInListAction}/>
    );
  }
}

export default VideoDetect;
