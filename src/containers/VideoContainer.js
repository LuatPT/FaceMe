import { connect } from 'react-redux';
import * as getData from '../api/action/getDataAction';
import { bindActionCreators } from 'redux';
import VideoDetect from '../views/VideoDetect';

const mapStateToProps = (state) => ({
  listDataVideo: state.listData,
});
const mapDispatchToProp = (dispatch) => ({
  getDataVideo: bindActionCreators(getData, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProp)(VideoDetect);
