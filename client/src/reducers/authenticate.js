import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/authenticate';

const initialState =  {
  isAuthenticated: false,
  user: null,
};

const authenticate = ( state = initialState, action ) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        user: action.payload
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        user: null
      });
    default:
      return state;
  }
}

export default authenticate;
