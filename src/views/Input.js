import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { loadModels, getFullFaceDescription } from '../api/face';


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
    const list = Object.values(this.state.listData);
    var desc = this.state.fullDesc[0].descriptor;
    var name = this.state.name;
    let nameUpdate, positionUpdateMe, oldDesc;
    let isUpdate = false;

    if (desc !== null && name !== null && list.length > 0) {
      list.map(ele => {
        // If data is exist . Do Update
        if (ele.name === name) {
          // position will be update
          let positionUpdate = 1;
          // Do loop to find position will be update
          for (let i = 0; i <= 7; i++) {
            console.log(ele);
            if (ele.descriptors[i].toString().localeCompare(ele.descriptors[i + 1].toString()) === 0) {
              positionUpdate = i + 1;
              oldDesc = ele.descriptors[i];
              break;
            } else {
              continue;
            }
          }
          isUpdate = true;
          nameUpdate = ele.name;
          positionUpdateMe = positionUpdate;

        }

      })
      if (isUpdate === true) {
        updateData.updateDataAction({ name: nameUpdate, descriptor: desc.toString(), position: positionUpdateMe, oldDesc: oldDesc })
      } else {
        addData.addDataAction({ name: name, descriptor: desc.toString() });
        // Insert data to db
      }
    }


  }
  changeNameInput = (eve) => {
    this.setState({ name: eve.target.value })
  }
  handleImage = async (image = this.state.imageURL) => {
    document.getElementById("loader").style.display = "block";
    await getFullFaceDescription(image).then(fullDesc => {
      if (fullDesc !== null && fullDesc !== undefined && fullDesc.length !== 0) {
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
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
        <div id="loader">Loading</div>
        <div id="myDiv" className="animate-bottom">
          <h2>Tada!</h2>
          <p>Loading Complete 100%!!!</p>
        </div>
        <input type="text" placeholder="Please type name..." onChange={this.changeNameInput} /><br />
        <div class="button-wrapper">
          <span class="label">
            Upload File
          </span>
          <input type="file" ref={this.textInput} name="upload" id="upload" className="upload-box" placeholder="Upload File" onChange={() => this.handleFileChange(listData)} accept=".jpg, .jpeg, .png" />
        </div>
        <button onClick={() => this.addData()} type="button" class="btn btn-outline-success">Add Data</button>
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
