import { combineReducers } from 'redux';

import listData from './listData';
import listCheckIn from './listCheckIn';

export default combineReducers({
  listData,
  listCheckIn
})