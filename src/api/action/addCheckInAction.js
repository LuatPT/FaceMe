import axios from 'axios';
export const addCheckInAction = (obj) => {
  console.log(obj);
  return (dispatch) => {
    axios
      .post('http://localhost:3002/api/v1/times', obj)
      .then((res) => {
        dispatch(addCheckIn(res))
        alert("Check In succesfully")
      })
      .catch((err) => console.log(err));
  };
};
const addCheckIn = (message) => ({
  type: 'ADD_CHECK_IN',
  message,
});

export default addCheckInAction;