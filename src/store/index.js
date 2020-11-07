import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_CARD,
  SUFFLE_CARD,
  OPEN_MODAL,
  CLOSE_MODAL,
  TEXT_CHANGE,
  SELECTED_LIST,
  REMOVE_CARD,
  ADD_LIST,
  REMOVE_LIST,
} from './actions';

export const AppContext = React.createContext({});
export const initialState = {
  showModal: false,
  isEdit: false,
  selectedListId: '',
  selectedCard: {},
  list: [
    {
      id: 11,
      title: 'list 1',
    },
    {
      id: 22,
      title: 'list 2',
    },
    {
      id: 33,
      title: 'list 3',
    },
  ],
  cards: [
    {
      id: 1,
      title: 'card 1',
      listId: 11,
    },
    {
      id: 2,
      title: 'card 1',
      listId: 11,
    },
    {
      id: 3,
      title: 'card 1',
      listId: 11,
    },
    {
      id: 4,
      title: 'card 1',
      listId: 22,
    },
  ],
};

const suffleCard = (state, action) => {
  const { cards } = state;
  const { payload } = action;

  let _idx = cards.findIndex((cd) => cd.id === payload.id);
  cards[_idx] = payload;
  return { ...state, ...{ cards } };
};

const addcard = (state, action) => {
  const { cards, selectedCard, selectedListId, isEdit } = state;
  let _card = { ...selectedCard };
  let _cards = [...cards];
  if(!isEdit) {
    _card.id = uuidv4();
    _card.listId = selectedListId;
    _cards.push(_card);
  } else {
    let _idx = _cards.findIndex((cd) => cd.id === selectedCard.id);
    _cards[_idx] = _card
  }
  return { ...state, ...{ cards: _cards } };
};

const onTextChange = (state, action) => {
  const { selectedCard } = state;
  let _obj = { ...selectedCard };
  _obj[action.payload.target.name] = action.payload.target.value;
  return { ...state, ...{ selectedCard: _obj } };
};

const removeCard = (state, action) => {
  const { cards } = state;
  let _cards = [...cards];
  let _idx = _cards.findIndex((cd) => cd.id === action.payload.id);
  _cards.splice(_idx, 1);
  return { ...state, ...{ cards: _cards } };
};

const removeList = (state, action) => {
  const { list } = state;
  let _list = [...list];
  let _idx = _list.findIndex((cd) => cd.id === action.payload.id);
  _list.splice(_idx, 1);
  return { ...state, ...{ list: _list } };
};

const addNewListToBoard = (state, action) => {
  const { list, isEdit } = state;
  let _obj = {
    title: action.payload
  }
  let _list = [...list];
  if(!isEdit) {
    _obj.id = uuidv4();
    _list.push(_obj);
  } else {
    let _idx = _list.findIndex((ls) => ls.id === action.payload.id);
    _list[_idx] = _list
  }
  return { ...state, ...{ list: _list } };
}

export default function reducer(state, action) {
  switch (action.type) {
    case ADD_CARD:
      return addcard(state, action);
    case SUFFLE_CARD:
      return suffleCard(state, action);
    case TEXT_CHANGE:
      return onTextChange(state, action);
    case SELECTED_LIST:
      return { ...state, ...action.payload };
    case OPEN_MODAL:
      return { ...state, ...action.payload };
    case CLOSE_MODAL:
      return { ...state, ...action.payload };
    case REMOVE_CARD:
      return removeCard(state, action);
    case ADD_LIST:
      return addNewListToBoard(state, action);
    case REMOVE_LIST:
        return removeList(state, action);
    default:
      return state;
  }
}
