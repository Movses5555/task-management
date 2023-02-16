import * as types from "./types";

const createListCompleted = (data) => ({
  type: types.CREATE_LIST_COMPLETED,
  payload: data,
});
const createListStart = () => ({
  type: types.CREATE_LIST_START,
});
const editListStart = () => ({
  type: types.EDIT_LIST_START,
});

const editListCompleted = (data) => ({
  type: types.EDIT_LIST_COMPLETED,
  payload: data,
});

const deleteListStart = () => ({
  type: types.DELETE_LIST_START,
});

const deleteListCompleted = (data) => ({
  type: types.DELETE_LIST_COMPLETED,
  payload: data,
});

const createCardStart = () => ({
  type: types.CREATE_CARD_START,
});
const createCardCompleted = (data) => ({
  type: types.CREATE_CARD_COMPLETED,
  payload: data,
});

const deleteCardStart = () => ({
  type: types.DELETE_CARD_START,
});
const deleteCardCompleted = (data) => ({
  type: types.DELETE_CARD_COMPLETED,
  payload: data,
});
const editCardStart = () => ({
  type: types.EDIT_CARD_START,
});
const editCardCompleted = (data) => ({
  type: types.EDIT_CARD_COMPLETED,
  payload: data,
});
export {
  createListCompleted,
  createListStart,
  editListStart,
  editListCompleted,
  deleteListStart,
  deleteListCompleted,
  createCardStart,
  createCardCompleted,
  deleteCardStart,
  deleteCardCompleted,
  editCardStart,
  editCardCompleted,
};
