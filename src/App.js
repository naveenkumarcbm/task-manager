import { useReducer } from 'react';
import reducer, { AppContext, initialState } from './store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, Form, List } from './components';
import { Button, Container, ListTitle, Board } from './styled';
import Modal from 'react-modal';
import { openModal, removeList, selectedListId } from './store/actions';
import AddList from './components/list/AddList';

const cardFields = [
  {
    type: 'text',
    placeholder: 'Card title',
    name: 'title',
    autoFocus: true,
    required: true,
  },
  {
    type: 'textarea',
    placeholder: 'Description',
    name: 'description',
  },
];

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createCard = (listId) => {
    dispatch(openModal());
    dispatch(selectedListId(listId));
  };

  const removeSelectedList = (ls) => {
    dispatch(removeList(ls));
  };

  const { list, cards, showModal, isEdit } = state;
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <DndProvider backend={HTML5Backend}>
        <ListTitle>
          <h1>Personal Task Manager</h1>
        </ListTitle>
        <Board>
          <ListTitle>
            <h2>Task Manager</h2>
          </ListTitle>
          <Container>
            {list.map((ls) => (
              <>
                <List key={ls.id} listId={ls.id}>
                  <ListTitle>
                    {ls.title}
                    <ion-icon
                      name='close-outline'
                      onClick={() => removeSelectedList(ls)}
                    ></ion-icon>
                  </ListTitle>
                  {cards
                    .filter((crd) => crd.listId === ls.id)
                    .map((cd, i) => (
                      <Card
                        key={'card_' + cd.id}
                        data={cd}
                        index={i}
                        listId={ls.id}
                      />
                    ))}
                  <div>
                    <Button onClick={() => createCard(ls.id)}>
                      Add new task
                    </Button>
                  </div>
                </List>
              </>
            ))}
            <div>
              <AddList />
            </div>
          </Container>
        </Board>
        <Modal isOpen={showModal} ariaHideApp={false}>
          <Form
            fields={cardFields}
            title={isEdit ? 'Edit Task' : 'Create Task'}
          />
        </Modal>
      </DndProvider>
    </AppContext.Provider>
  );
}

export default App;
