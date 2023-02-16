import * as types from "./types";
import createReducer from "../../utils/createReducer";
import { v4 as uuidv4 } from "uuid";
import initialState from "./initialState";

const reducersMap = {
  [types.CREATE_LIST_START]: (state) => {
    return {
      ...state,
      isCreateFetching: true,
    };
  },
  [types.CREATE_LIST_COMPLETED]: (state, action) => {
    const { payload } = action;
    let newItem = {
      id: uuidv4(),
      title: payload,
      cards: [],
    };
    return {
      ...state,
      data: [...state.data, newItem],
      isCreateFetching: false,
    };
  },
  [types.EDIT_LIST_START]: (state) => {
    return {
      ...state,
      isEditFetching: true,
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
      isEditFetching: false,
    };
  },
  [types.DELETE_LIST_START]: (state) => {
    return {
      ...state,
      isDeleteFetching: true,
    };
  },
  [types.DELETE_LIST_COMPLETED]: (state, action) => {
    const id = action.payload;
    let newData = [...state.data].filter((el) => el.id !== id);
    return {
      ...state,
      data: newData,
      isDeleteFetching: false,
    };
  },
  [types.CREATE_CARD_START]: (state) => {
    return {
      ...state,
      isCreateFetching: true,
    };
  },
  [types.CREATE_CARD_COMPLETED]: (state, action) => {
    const { id, title, description } = action.payload;
    let newCard = {
      id:uuidv4(),
      title,
      description,
    };
    console.log('====================================');
    console.log(newCard);
    console.log('====================================');
    let newList = [...state.data].map((el) => {
      if (el.id === id) {
        el = {
          ...el,
          cards: [...el.cards, newCard],
        };
      }
      return el;
    });
    console.log(newList);
    return {
      ...state,
      data: newList,
      isCreateFetching: false,
    };
  },
};

export default createReducer(initialState)(reducersMap);
