import axios from 'axios';
const addDataAction = (obj) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3002/api/v1/inputdata', obj)
      .then((res) => {
        dispatch(addData(res))
        alert("Add Input succesfully")
      })
      .catch((err) => console.log(err));
  };
};
const addData = (message) => ({
  type: 'ADD_DATA',
  message,
});
export default addDataAction