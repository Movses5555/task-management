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
      id: uuidv4(),
      title,
      description,
    };
    let newList = [...state.data].map((el) => {
      if (el.id === id) {
        el = {
          ...el,
          cards: [...el.cards, newCard],
        };
      }
      return el;
    });
    return {
      ...state,
      data: newList,
      isCreateFetching: false,
    };
  },
  [types.DELETE_CARD_START]: (state) => {
    return {
      ...state,
      isCardDeleteFetching: true,
    };
  },
  [types.DELETE_CARD_COMPLETED]: (state, action) => {
    const { id, listId } = action.payload;
    let newList = [...state.data].map((el) => {
      if (el.id === listId) {
        el.cards = el.cards.filter((card) => card.id !== id);
      }
      return el;
    });
    return {
      ...state,
      data: newList,
      isCardDeleteFetching: false,
    };
  },
  [types.EDIT_CARD_START]: (state) => {
    return {
      ...state,
      isCardEditFetching: true,
    };
  },
  [types.EDIT_CARD_COMPLETED]: (state, action) => {
    const { id, listId, title, description } = action.payload;
    let newList = [...state.data].map((el) => {
      if (el.id === listId) {
        let newCards = [...el.cards].map((card) => {
          if (card.id === id) {
            card = {
              ...card,
              title,
              description,
            };
          }
          return card;
        });
        console.log(newCards);
        el = {
          ...el,
          cards: newCards,
        };
      }
      return el;
    });
    console.log(newList);
    return {
      ...state,
      data: newList,
      isCardEditFetching: false,
    };
  },
};

export default createReducer(initialState)(reducersMap);
