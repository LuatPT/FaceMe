import axios from 'axios';
const updateDataAction = (obj) => {
  return (dispatch) => {
    axios
      .put('http://localhost:3002/api/v1/inputdata/' + obj.name, obj)
      .then((res) => {
        dispatch(updateData(res))
        alert("Update Input succesfully")
      })
      .catch((err) => console.log(err));
  };
};
const updateData = (message) => ({
  type: 'UPDATE_DATA',
  message,
});

export default updateDataAction