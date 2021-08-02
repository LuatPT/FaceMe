import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';
import MyImage from './MyImage';

const inputSize = 512;
const isVideo = false;
// Initial State
const INIT_STATE = {
  imageURL: "",
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null,
  emotion: null,
  age: null,
  gender: null,
  errorStatus: false
};

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
class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = { ...INIT_STATE, faceMatcher: null };
    this.url = React.createRef();
  }

  componentWillMount = async () => {
    await loadModels();
    const { listData } = this.props;
    this.setState({ faceMatcher: createMatcher(listData) });
    // await this.handleImage(this.state.imageURL);
  };
    // Upload by type url
  changeInput = async (listData) => {
    this.setState({ faceMatcher: await createMatcher(listData) });
    // this.resetState();
    await this.setState({
      imageURL: this.url.current.value,
      loading: true
    });
    this.handleImage();
  }

  handleImage = async (image = this.state.imageURL) => {
    //Dispplay loading
    document.getElementById("loader").style.display = "block";

    await getFullFaceDescription(image,inputSize, isVideo).then(fullDesc => {
      if (fullDesc !== null && fullDesc !== undefined && fullDesc.length !== 0) {
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
        var emotionMe = findEmotion(fullDesc[0].expressions)
        // 1 angry
        // 2 disgusted
        // 3 fearful
        // 4 happy
        // 5 neutral
        // 6 sad
        // 7 surprised
        this.setState({
          fullDesc,
          detections: fullDesc.map(fd => fd.detection),
          descriptors: fullDesc.map(fd => fd.descriptor),
          emotion: emotionMe,
          age: fullDesc[0].age,
          gender: fullDesc[0].gender
        });
      } else {
        this.setState({ errorStatus: true })
      }
    });

    if (!!this.state.descriptors && !!this.state.faceMatcher) {
      let match = await this.state.descriptors.map(descriptor =>
        this.state.faceMatcher.findBestMatch(descriptor)
      );
      this.setState({ match });
    }
  };
  // Upload by choose file
  handleFileChange = async (listData) => {
    this.setState({ faceMatcher: await createMatcher(listData) });
    // from an input element
    await this.setState({
      imageURL: URL.createObjectURL(this.textInput.current.files[0]),
      loading: true
    });
    this.handleImage();
  }
  resetState = () => {
    this.setState({ ...INIT_STATE });
  };

  render() {
    const { detections, match } = this.state;
    const { listData } = this.props;
    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i} >
            <div
              style={{ position: 'absolute', border: 'solid', borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match ? (
                <div>
                  <p
                    style={{ backgroundColor: 'blue', border: 'solid', borderColor: 'blue', marginTop: 0, color: '#fff',
                      width: _W,
                      transform: `translate(-3px,${_H}px)`
                    }}
                  >
                    {match[i]._label}-{Math.floor(this.state.age)} tuổi-{this.state.gender}-{this.state.emotion}
                  </p>
                </div>
              ) : <p
                    style={{ backgroundColor: 'blue', border: 'solid',borderColor: 'blue', marginTop: 0,color: '#fff',
                      width: _W,
                      transform: `translate(-3px,${_H}px)`
                    }}
                  >OK deo co gi</p>}
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        {/* Loading process */}
        <div id="loader">Loading</div>
        <div id="myDiv" className="animate-bottom">
          <h2>Tada!</h2>
          <p>Loading Complete 100%!!!</p>
        </div>
        <h2>{this.state.errorStatus === true ? "The imported images must be of good resolution " : ""}</h2>

        {/* Main process */}
        <input type="text" ref={this.url} placeholder="Type your url..." />
        <button type="button" className="btn btn-outline-success" onClick={() => this.changeInput(listData)}>Display Image</button>
        <div className="button-wrapper">
          <span className="label"> Upload File</span>
          <input type="file"  name="upload" id="upload" className="upload-box" placeholder="Upload File"
           onChange={() => this.handleFileChange(listData)} ref={this.textInput} accept=".jpg, .jpeg, .png"/>
        </div>

        <div className="imageWrapper">
           <MyImage drawBox={drawBox} imageURL={this.state.imageURL} />
        </div>
      </div>
    );
  }
}

export default withRouter(ImageInput);
