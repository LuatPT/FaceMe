import axios from 'axios';
export const updateDataAction = (obj) => {
  console.log(obj);
  return (dispatch) => {
    axios
      .put('http://localhost:3002/api/v1/inputdata/' + obj.data_id, obj)
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