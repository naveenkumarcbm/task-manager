import { useState, useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import { AppContext } from '../../store';
import { removeSelectedCard, editcard, moveSelectedCard } from '../../store/actions';
import { Title } from '../../styled';

const CardDescription = styled.div`
  padding: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Card = ({ item, index, moveCard, listId }) => {

  const [dropData, setDropData] = useState({})

  const { dispatch } = useContext(AppContext);
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'CARD', ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item, monitor) => {
      if (!ref.current && item.listId !== listId) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      setDropData(({item, hoverIndex, listId}));
    },
    // canDrop:  
    drop: (item, monitor) => {
      dispatch(moveSelectedCard(dropData))
    }
  });

  const { title, description } = item;
  const opacity = isDragging ? 0.4 : 1;
  const removeCard = () => {
    dispatch(removeSelectedCard(item));
  };

  const editCard = () => {
    dispatch(editcard(item));
  };

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className='card'
      onDoubleClick={editCard}
      style={{ opacity }}
    >
      <Title>
        <h4>{title}</h4>
        <ion-icon name='close-outline' onClick={removeCard}></ion-icon>
      </Title>
      <CardDescription>{description}</CardDescription>
    </div>
  );
};

export default Card;
