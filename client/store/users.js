import axios from 'axios';

// action type constants
const SET_USERS = 'SET_USERS';

const _setUsers = (users) => {
  return {
    users,
    type: SET_USERS
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    dispatch(_setUsers(response.data));
  };
};

// THUNK CREATORS

export default (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};
