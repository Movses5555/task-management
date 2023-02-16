import * as types from "./types";
import createReducer from "../../utils/createReducer";
import { v4 as uuidv4 } from "uuid";
import initialState from "./initialState";

const reducersMap = {
  [types.CREATE_LIST_START]: (state) => {
    return {
      ...state,
      isFetching: true,
    };
  },
  [types.CREATE_LIST_COMPLETED]: (state, action) => {
    const { payload } = action;
    let newItem = {
      id: uuidv4(),
      title: payload,
      tasks: [],
    };
    return {
      ...state,
      data: [...state.data, newItem],
      isFetching: false,
    };
  },
  [types.EDIT_LIST_START]: (state) => {
    return {
      ...state,
      isFetching: true,
    };
  },
  [types.EDIT_LIST_COMPLETED]: (state, action) => {
    const {
      payload: { title, id },
    } = action;
    let newData = [...state.data].map((el) => {
      if (el.id === id) {
        el = {
          ...el,
          title,
        };
      }
      return el;
    });
    return {
      ...state,
      data: newData,
      isFetching: false,
    };
  },
  [types.DELETE_LIST_START]: (state) => {
    return {
      ...state,
      isFetching: true,
    };
  },
  [types.DELETE_LIST_COMPLETED]: (state, action) => {
    console.log(action.payload);
    const id = action.payload;
    let newData = [...state.data].filter((el) => el.id !== id);
    console.log(newData);
    return {
      ...state,
      data: newData,
      isFetching: false,
    };
  },
};

export default createReducer(initialState)(reducersMap);
