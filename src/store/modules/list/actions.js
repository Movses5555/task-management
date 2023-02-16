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

export {
  createListCompleted,
  createListStart,
  editListStart,
  editListCompleted,
  deleteListStart,
  deleteListCompleted,
};
