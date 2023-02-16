import * as types from "./types";
import createReducer from "../../utils/createReducer";
import initialState from "./initialState";

const reducersMap = {
  [types.REQUEST_STARTED]: (state, action) => {
    const existingCall = state.requests.find(
      (request) => request.name === action.payload.requestName
    );
    if (existingCall) {
      return {
        ...state,
        requests: state.requests.map((request) =>
          request.name === action.payload.requestName
            ? { ...request, inProgress: true, error: null }
            : request
        ),
      };
    }
    return {
      ...state,
      requests: [
        ...state.requests,
        {
          name: action.payload.requestName,
          inProgress: action.payload.inProgress,
        },
      ],
    };
  },
  [types.REQUEST_FINISHED]: (state, action) => {
    return {
      ...state,
      requests: state.requests.filter(
        (request) => request.name !== action.payload.requestName
      ),
    };
  },
};

export default createReducer(initialState)(reducersMap);
