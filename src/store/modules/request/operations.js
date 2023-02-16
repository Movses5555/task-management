import * as actions from "./actions";

export const requestHelper = async (dispatch, requestName, request) => {
  dispatch(actions.requestStarted(requestName));
  try {
    await request();
    dispatch(actions.requestFinished(requestName));
  } catch (error) {
    console.error(error);
  }
};
