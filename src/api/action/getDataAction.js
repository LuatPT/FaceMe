import axios from 'axios';
const getDataAction = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:3002/api/v1/inputdata')
      .then((res) => {
        dispatch(getData(res.data));
      })
      .catch((err) => console.log(err));
  };
};
const getData = (data) => ({
  type: 'GET_DATA',
  data,
});
export default getDataAction;