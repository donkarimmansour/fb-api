import { ADD_ID, GET_IDS } from "../constants/ids";

const INITIAL_STATE = {
  ids: [],
  count: 0,
};

const idsReducer = (state = INITIAL_STATE, action) => {
  if (action.type === GET_IDS) {
    return {
      ...state,
      ids: action.payload,
    };
  } else if (action.type === ADD_ID) {
    return {
      count: state.count + 1,
      ids: [action.payload, ...state.ids],
    };
  } else {
    return state;
  }
};
export default idsReducer;