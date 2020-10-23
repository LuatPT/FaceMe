import axios from 'axios';
export const addDataAction = (obj) => {
  console.log(obj);
  return (dispatch) => {
    axios
      .post('http://localhost:3002/api/v1/inputdata', obj)
      .then((res) => {
        dispatch(addData(res))
      })
      .catch((err) => console.log(err));
  };
};
const addData = (message) => ({
  type: 'ADD_DATA',
  message,
});