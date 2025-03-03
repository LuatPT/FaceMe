import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';

const WIDTH = 1366;
const HEIGHT = 480;
const inputSize = 512;
const isVideo = true;

function findEmotion(input) {
  var arr = [
    input.angry,
    input.disgusted,
    input.fearful,
    input.happy,
    input.neutral,
    input.sad,
    input.surprised
  ];
  var maxEmo = Math.max(...arr);
  var flag = null;
  switch (maxEmo) {
    case input.angry:
      flag = "Giận dữ";
      break;
    case input.fearful:
      flag = "Sợ hãi";
      break;
    case input.disgusted:
      flag = "Ghê tởm";
      break;
    case input.happy:
      flag = "Vui vẻ";
      break;
    case input.neutral:
      flag = "Bình thường";
      break;
    case input.sad:
      flag = "Buồn";
      break;
    case input.surprised:
      flag = "Ngạc nhiên";
      break;
    default:
      break;
  }
  return flag
}
class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      fullDesc: null,
      detections: null,
      descriptors: null,
      faceMatcher: null,
      match: null,
      facingMode: null,
      emotion: null,
      age: null,
      gender: null
    };
  }
  componentDidMount = () => {
    this.props.getcheckInListAction();
  }

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(device => device.kind === 'videoinput');
      if (inputDevice.length < 2) {
        await this.setState({facingMode: 'user'});
      } else {
        await this.setState({facingMode: { exact: 'environment' }});
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {this.capture()}, 1500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  capture = async () => {
    if (!!this.webcam.current) {
      await getFullFaceDescription(this.webcam.current.getScreenshot(), inputSize, isVideo).then(fullDesc => {
        if (fullDesc !== null && fullDesc !== undefined && fullDesc.length !== 0) {
          var emotionMe = findEmotion(fullDesc[0].expressions)
          // 1 angry
          // 2 disgusted
          // 3 fearful
          // 4 happy
          // 5 neutral
          // 6 sad
          // 7 surprised
          this.setState({
            detections: fullDesc.map(fd => fd.detection),
            descriptors: fullDesc.map(fd => fd.descriptor),
            emotion: emotionMe,
            age: fullDesc[0].age,
            gender: fullDesc[0].gender
          });
        }
      });

      if (!!this.state.descriptors && !!this.state.faceMatcher) {
        let match = await this.state.descriptors.map(descriptor =>
          this.state.faceMatcher.findBestMatch(descriptor)
        );
        this.setState({ match });
      }
    }
    
    this.checkInNow();
  };

  checkInNow = async() => {
     const { match } = this.state;
     const { addCheckInAction, listCheckIn } = this.props;
     await this.props.getcheckInListAction();
     if(match !== null && match.length > 0 && listCheckIn.length >= 0){
      var obj = {
        name: match[0]._label,
        time_check_in : new Date().toLocaleString(),
        time_check_out : new Date().toLocaleString(),
        update_by : "Admin",
      }
      if(listCheckIn.length === 0 || listCheckIn.filter(e=> e.name === match[0]._label).length === 0 ){
        addCheckInAction(obj);
      }
    }
  }


  startDetectVideo = async (listDataVideo) => {
    await loadModels();
    this.setState({ faceMatcher: await createMatcher(listDataVideo) });
    this.setInputDevice();
  }
  render() {
    const { detections, match, facingMode } = this.state;
    const { listDataVideo, listCheckIn } = this.props;
    let videoConstraints = null;
    let camera = '';
    if (!!facingMode) {
      videoConstraints = {width: WIDTH, height: HEIGHT, facingMode: facingMode};
      if (facingMode === 'user') {
        camera = 'Front';
      } else {
        camera = 'Back';
      }
    }

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: 'blue',
                    border: 'solid',
                    borderColor: 'blue',
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}-{Math.floor(this.state.age)} tuổi-{this.state.gender}-{this.state.emotion}
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return (
      <div className="cameraDiv">
        <button onClick={() => this.startDetectVideo(listDataVideo)} type="button" className="btn btn-outline-success">Start Detect</button>
        <p>Camera: {camera}</p>
        <div style={{width: WIDTH, height: HEIGHT}} >
          <div style={{ position: 'relative', width: WIDTH }}>
            {!!videoConstraints ? (
              <div style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={WIDTH}
                  height={HEIGHT}
                  ref={this.webcam}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : null}
            {!!drawBox ? drawBox : null}
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-12">
            <table className="table table-image">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  {/* <th scope="col">Image</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Check In</th>
                  <th scope="col">Check Out</th>
                  <th scope="col">Update By</th>
                </tr>
              </thead>
              <tbody>
                  {listCheckIn.length> 0 ? listCheckIn.map((e,key)=> (
                  <tr key={key}>
                    <th scope="row">{e.id}</th>
                    <td className="w-25">
                      {/* <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg" className="img-fluid img-thumbnail" alt="Sheep"/> */}
                    </td>
                    <td>{e.name}</td>
                    <td>{e.time_check_in}</td>
                    <td>{e.time_check_out}</td>
                    <td>{e.update_by}</td>
                  </tr>
                  )): (<tr><th scope="row">Loading...</th></tr>)
                  }
              </tbody>
            </table>   
            </div>
          </div>
        </div>
      </div>
    );
    
  }
}

export default withRouter(VideoInput);
