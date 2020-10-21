import { connect } from 'react-redux';
import * as getData from '../api/action/getDataAction';
import { bindActionCreators } from 'redux';
import Detect from '../views/Detect';

const mapStateToProps = (state) => ({
  listData: state.listData,
});
const mapDispatchToProp = (dispatch) => ({
  getData: bindActionCreators(getData, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProp)(Detect);
