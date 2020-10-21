import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';
import MyImage from './MyImage';


// Import image to test API
// const testImg = require('../img/test.jpg');

// Import face profile
const JSON_PROFILE = require('../descriptors/bnk48.json');

// Initial State
const INIT_STATE = {
  imageURL: "",
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null
};

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
  changeInput = () => {
    this.setState({ imageURL: this.url.current.value });
  }

  handleImage = async (image = this.state.imageURL) => {
    await getFullFaceDescription(image).then(fullDesc => {
      console.log(fullDesc);
      if (!!fullDesc) {
        this.setState({
          fullDesc,
          detections: fullDesc.map(fd => fd.detection),
          descriptors: fullDesc.map(fd => fd.descriptor)
        });
      }
    });

    if (!!this.state.descriptors && !!this.state.faceMatcher) {
      let match = await this.state.descriptors.map(descriptor =>
        this.state.faceMatcher.findBestMatch(descriptor)
      );
      this.setState({ match });
    }
  };

  handleFileChange = async listData => {
    console.log(listData);
    this.setState({ faceMatcher: await createMatcher(listData) });
    this.resetState();
    await this.setState({
      imageURL: URL.createObjectURL(this.textInput.current.files[0]),
      loading: true
    });
    this.handleImage();
  };

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
              {!!match ? (
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
                  {match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        <input
          id="myFileUpload"
          type="file"
          ref={this.textInput}
          onChange={() => this.handleFileChange(listData)}
          accept=".jpg, .jpeg, .png"
        />
        <input type="text" ref={this.url} />
        <button onClick={() => this.changeInput()}>Ok</button>
        <MyImage drawBox={drawBox} imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default withRouter(ImageInput);
