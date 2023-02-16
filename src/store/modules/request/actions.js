import * as types from "./types";
const requestStarted = (requestName) => {
  return {
    type: types.REQUEST_STARTED,
    payload: {
      requestName,
      inProgress: true,
    },
  };
};
const requestFinished = (requestName) => ({
  type: types.REQUEST_FINISHED,
  payload: {
    requestName,
    inProgress: false,
  },
});

export { requestFinished, requestStarted };
