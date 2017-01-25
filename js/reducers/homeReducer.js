/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */

import { LOAD_ROUTES, CHANGE_OWNER_NAME, CHANGE_PROJECT_NAME } from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';

const initialState = {
  projectName: 'React.js Boilerplate',
  ownerName: 'mxstbr',
  lines: []
};

function homeReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case LOAD_ROUTES:
      console.log('action:', action);
      return assignToEmpty(state, {
        lines: action.lines
      });
    case CHANGE_OWNER_NAME:
      return assignToEmpty(state, {
        ownerName: action.name
      });
    case CHANGE_PROJECT_NAME:
      return assignToEmpty(state, {
        projectName: action.name
      });
    default:
      return state;
  }
}

export default homeReducer;
