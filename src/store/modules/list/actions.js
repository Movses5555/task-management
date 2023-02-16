import * as types from "./types";

const createListCompleted = (data) => ({
  type: types.CREATE_LIST_COMPLETED,
  payload: data,
});

const editListCompleted = (data) => ({
  type: types.EDIT_LIST_COMPLETED,
  payload: data,
});

const deleteListCompleted = (data) => ({
  type: types.DELETE_LIST_COMPLETED,
  payload: data,
});

const createCardCompleted = (data) => ({
  type: types.CREATE_CARD_COMPLETED,
  payload: data,
});

const deleteCardCompleted = (data) => ({
  type: types.DELETE_CARD_COMPLETED,
  payload: data,
});

const editCardCompleted = (data) => ({
  type: types.EDIT_CARD_COMPLETED,
  payload: data,
});

const dropCardCompleted = (data) => ({
  type: types.DROP_CARD_COMPLETED,
  payload: data,
});
export {
  createListCompleted,
  editListCompleted,
  deleteListCompleted,
  createCardCompleted,
  deleteCardCompleted,
  editCardCompleted,
  dropCardCompleted,
};
