import { connect } from 'react-redux';
import getDataAction from '../api/action/getDataAction';
import addCheckInAction from '../api/action/addCheckInAction';
import VideoDetect from '../views/VideoDetect';

const mapStateToProps = (state) => ({
  listDataVideo: state.listData,
});
const mapDispatchToProp = (dispatch) => ({
  getDataAction: () => dispatch(getDataAction()),
  addCheckInAction: (obj) => dispatch(addCheckInAction(obj))
});
export default connect(mapStateToProps, mapDispatchToProp)(VideoDetect);
