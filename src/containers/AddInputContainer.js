import { connect } from 'react-redux';
import * as addData from '../api/action/addDataAction';
import { bindActionCreators } from 'redux';
import Input from '../views/Input';


const mapDispatchToProp = (dispatch) => ({
  addData: bindActionCreators(addData, dispatch),
});
export default connect(null, mapDispatchToProp)(Input);
