const listCheckIn = (state = [], action) => {
    switch (action.type) {
      case 'GET_CHECKIN_LIST':
        return action.list
      default:
        return state
    }
  }
  export default listCheckIn