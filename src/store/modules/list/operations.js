import * as actions from "./actions";
import sleep from "helpers/sleep";
import toast from "helpers/toast";
import { requestsEnum } from "../requestsEnum";
import { requestHelper } from "../request/operations";

export const createNewList = (data) => async (dispatch) => {
  return await requestHelper(dispatch, requestsEnum().createList, async () => {
    await sleep();
    dispatch(actions.createListCompleted(data));
    toast.success("List was successfully created!");
  });
};

export const editListOperation = (data) => async (dispatch) => {
  return await requestHelper(dispatch, requestsEnum().editList, async () => {
    await sleep();
    dispatch(actions.editListCompleted(data));
    toast.success("List title was successfully edited!");
  });
};

export const deleteListOperation = (id) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestsEnum(id).deleteList,
    async () => {
      await sleep();
      dispatch(actions.deleteListCompleted(id));
      toast.success("List was successfully deleted!");
    }
  );
};

export const createNewCardOperation = (data) => async (dispatch) => {
  return await requestHelper(dispatch, requestsEnum().createCard, async () => {
    await sleep();
    dispatch(actions.createCardCompleted(data));
    toast.success("Card was successfully created!");
  });
};

export const deleteCardOperation = (data) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestsEnum(data.id).deleteCard,
    async () => {
      await sleep();
      dispatch(actions.deleteCardCompleted(data));
      toast.success("Card was successfully deleted!");
    }
  );
};

export const editCardOperation = (data) => async (dispatch) => {
  return await requestHelper(
    dispatch,
    requestsEnum(data.id).editCard,
    async () => {
      await sleep();
      dispatch(actions.editCardCompleted(data));
      toast.success("Card was successfully edited!");
    }
  );
};
