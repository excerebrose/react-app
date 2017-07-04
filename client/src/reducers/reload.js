import { RELOAD_TRUE } from '../actions/reload';

const reload = (state = 0 , action ) => {
  switch(action.type) {
    case RELOAD_TRUE:
      return state + 1;
    default:
      return state;
  }
};

export default reload;