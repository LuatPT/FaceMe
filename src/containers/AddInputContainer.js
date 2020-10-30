import { connect } from 'react-redux';
import * as addData from '../api/action/addDataAction';
import * as updateData from '../api/action/updateDataAction';
import * as getData from '../api/action/getDataAction';
import { bindActionCreators } from 'redux';
import Input from '../views/Input';

const mapStateToProps = (state) => ({
  listData: state.listData,
});
const mapDispatchToProp = (dispatch) => ({
  addData: bindActionCreators(addData, dispatch),
  updateData: bindActionCreators(updateData, dispatch),
  getData: bindActionCreators(getData, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProp)(Input);
