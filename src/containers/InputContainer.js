import { connect } from 'react-redux';
import getDataAction from '../api/action/getDataAction';
import Detect from '../views/Detect';

const mapStateToProps = (state) => ({
  listData: state.listData,
});
const mapDispatchToProp = (dispatch) => ({
  getDataAction: () => dispatch(getDataAction())
});
export default connect(mapStateToProps, mapDispatchToProp)(Detect);
