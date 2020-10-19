import { connect } from 'react-redux';
import * as getData from '../api/actions/getDataAction';
import { bindActionCreators } from 'redux';
import Input from '../views/Input';

const mapStateToProps = (state) => ({
  listData: state.listData,
});
const mapDispatchToProp = (dispatch) => ({
  getData: bindActionCreators(getData, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProp)(Input);
