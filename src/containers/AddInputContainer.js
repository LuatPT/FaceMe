import { connect } from 'react-redux';
import addDataAction from '../api/action/addDataAction';
import updateDataAction from '../api/action/updateDataAction';
import getDataAction from '../api/action/getDataAction';
import Input from '../views/Input';

const mapStateToProps = (state) => ({
  listData: state.listData,
});
const mapDispatchToProp = (dispatch) => ({
  addDataAction: (obj) => dispatch(addDataAction(obj)),
  updateDataAction: (obj) => dispatch(updateDataAction(obj)),
  getDataAction: () => dispatch(getDataAction())
});
export default connect(mapStateToProps, mapDispatchToProp)(Input);
