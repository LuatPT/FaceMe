import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';

// Import image to test API
const testImg = require('../img/test.jpg');

// Import face profile
// const JSON_PROFILE = require('../descriptors/bnk48.json');

// Initial State
const INIT_STATE = {
  imageURL: null,
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null,
  name: null,
  errorStatus: false,
  listData: []
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = { ...INIT_STATE, faceMatcher: null };
  }

  componentWillMount = async () => {
    const { getData } = this.props;
    //Load model first ready to detect
    await getData.getDataAction();
    await loadModels();

  };

  addData = () => {
    const { addData, updateData } = this.props;
    console.log(this.state.listData);
    const list = Object.values(this.state.listData);

    var desc = this.state.fullDesc[0].descriptor;
    var name = this.state.name;
    console.log(list);
    if (desc != null && name != null && list.length > 0) {
      list.map(ele => {
        console.log(ele);
        // If data is exist . Do Update
        if (ele.name == name) {
          console.log("Vao");
          // position will be update
          let positionUpdate = 1;
          // Do loop to find position will be update
          console.log("vo update");
          for (let i = 1; i <= 8; i++) {
            var data1 = "data_item" + i;
            var data2 = "data_item" + (i + 1);
            console.log(data1 + data2);
            if (ele.data1.localeCompare(ele.data2) == 0) {
              positionUpdate = i + 1;
              break;
            } else {
              continue;
            }
          }
          updateData.updateData({ name: ele.data_id, descriptor: desc.toString(), position: positionUpdate })
        }
        addData.addDataAction({ name: name, descriptor: desc.toString() });
      }

      )
      // Insert data to db

    }

  }
  changeNameInput = (eve) => {
    this.setState({ name: eve.target.value })
  }
  handleImage = async (image = this.state.imageURL) => {
    await getFullFaceDescription(image).then(fullDesc => {
      if (fullDesc !== null && fullDesc !== undefined && fullDesc.length !== 0) {
        this.setState({
          fullDesc,
          detections: fullDesc.map(fd => fd.detection),
          descriptors: fullDesc.map(fd => fd.descriptor)
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

  handleFileChange = async list => {
    // this.resetState();

    await this.setState({
      imageURL: URL.createObjectURL(this.textInput.current.files[0]),
      loading: true,
      listData: list
    });
    this.handleImage();
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };

  render() {
    const { imageURL, detections, match } = this.state;
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
        <input type="text" placeholder="Please type name..." onChange={this.changeNameInput} /><br />
        <input
          id="myFileUpload"
          type="file"
          ref={this.textInput}
          onChange={() => this.handleFileChange(listData)}
          accept=".jpg, .jpeg, .png"
        /><br />
        <button onClick={() => this.addData()}>Add Data</button>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute' }}>
            <img src={imageURL} alt="imageURL" />
          </div>
          {!!drawBox ? drawBox : null}
        </div>

      </div>
    );
  }
}

export default withRouter(Input);
