import { connect } from 'react-redux';
import getDataAction from '../api/action/getDataAction';
import addCheckInAction from '../api/action/addCheckInAction';
import getcheckInListAction from '../api/action/getcheckInListAction';

import VideoDetect from '../views/VideoDetect';

const mapStateToProps = (state) => ({
  listDataVideo: state.listData,
  listCheckIn: state.listCheckIn
});
const mapDispatchToProp = (dispatch) => ({
  getDataAction: () => dispatch(getDataAction()),
  addCheckInAction: (obj) => dispatch(addCheckInAction(obj)),
  getcheckInListAction : () => dispatch(getcheckInListAction())
});
export default connect(mapStateToProps, mapDispatchToProp)(VideoDetect);
