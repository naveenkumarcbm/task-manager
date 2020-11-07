import { useContext } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { AppContext } from '../../store';
import { removeSelectedCard, editcard } from '../../store/actions';
import { Title } from '../../styled';

const CardDescription = styled.div`
  padding: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Card = ({ item }) => {
  const { dispatch } = useContext(AppContext);
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'CARD', ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      // let _obj = {...item}
      // console.log(_obj)
      // console.log('Drag', {item, monitor})
    },
  });

  const { title, description } = item;
  const opacity = isDragging ? 0.4 : 1;
  const removeCard = () => {
    dispatch(removeSelectedCard(item));
  };

  const editCard = () => {
    dispatch(editcard(item))
  }

  return (
    <div ref={drag} className='card' onDoubleClick={editCard} style={{ opacity }}>
      <Title>
        <h4>{title}</h4>
        <ion-icon name='close-outline' onClick={removeCard}></ion-icon>
      </Title>
      <CardDescription>{description}</CardDescription>
    </div>
  );
};

export default Card;
