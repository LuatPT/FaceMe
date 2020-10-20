import { connect } from 'react-redux';
import * as getData from '../api/action/getDataAction';
import { bindActionCreators } from 'redux';
import ImageInput from '../views/ImageInput';

const mapStateToProps = (state) => ({
  listData: state.listData,
});
const mapDispatchToProp = (dispatch) => ({
  getData: bindActionCreators(getData, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProp)(ImageInput);
