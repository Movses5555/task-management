import * as actions from "./actions";
import sleep from "helpers/sleep";
import toast from "helpers/toast";
export const createNewList = (data) => {
  return async (dispatch) => {
    dispatch(actions.createListStart());
    try {
      await sleep();
      dispatch(actions.createListCompleted(data));
      toast.success("List successfully created");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
};

export const editListOperation = (data) => {
  return async (dispatch) => {
    dispatch(actions.editListStart());
    try {
      await sleep();
      dispatch(actions.editListCompleted(data));
      toast.success("Title was successfully edited");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
};

export const deleteListOperation = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteListStart());
    try {
      await sleep();
      dispatch(actions.deleteListCompleted(id));
      toast.success("List was successfully deleted");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
};

export const createNewCardOperation = (data) => {
  return async (dispatch) => {
    dispatch(actions.createCardStart());
    try {
      await sleep();
      dispatch(actions.createCardCompleted(data));
      toast.success("Card was successfully created");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
};
