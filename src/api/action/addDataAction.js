import axios from 'axios';
export const addDataAction = (obj) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3002/api/v1/inputdata', obj)
      .then((res) => {
        dispatch(addData(res.data));
        alert("Data have been added!")
      })
      .catch((err) => console.log(err));
  };
};
const addData = (message) => ({
  type: 'ADD_DATA',
  message,
});