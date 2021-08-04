import axios from 'axios';
const getcheckInListAction = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:3002/api/v1/times')
      .then((res) => {
        dispatch(getCheckInList(res.data));
      })
      .catch((err) => console.log(err));
  };
};
const getCheckInList = (list) => ({
  type: 'GET_CHECKIN_LIST',
  list,
});
export default getcheckInListAction;