export const ADD_CARD = 'ADD_CARD';
export const SUFFLE_CARD = 'SUFFLE_CARD';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const TEXT_CHANGE = 'TEXT_CHANGE';
export const SELECTED_LIST = 'SELECTED_LIST';
export const REMOVE_CARD = 'REMOVE_CARD';
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';

export const saveCard = () => ({ type: ADD_CARD });

export const openModal = () => ({
  type: OPEN_MODAL,
  payload: { showModal: true, isEdit: false },
});
export const editcard = payload => ({
  type: OPEN_MODAL,
  payload: { showModal: true, isEdit: true, selectedCard: payload },
});
export const closeModal = () => ({
  type: CLOSE_MODAL,
  payload: { showModal: false, isEdit: false, selectedCard:{} },
});

export const suffleSelectedCard = payload => ({ type: SUFFLE_CARD, payload });
export const removeSelectedCard = payload => ({ type: REMOVE_CARD, payload });

export const selectedListId = listId => ({ type: SELECTED_LIST, payload: {selectedListId: listId}});

//Form change
export const onInputChange = (payload) => ({ type: TEXT_CHANGE, payload });


//For List
export const addNewList = payload => ({type: ADD_LIST, payload}) 
export const removeList = payload => ({type: REMOVE_LIST, payload}) 