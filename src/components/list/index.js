import { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { AppContext } from '../../store';
import { suffleSelectedCard } from '../../store/actions';

const List = ({ children, listId }) => {
  const { dispatch } = useContext(AppContext);
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      if(item.listId !== listId) {
        let _obj = { ...item };
        _obj.listId = listId;
        dispatch(suffleSelectedCard(_obj));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  });

  return (
    <div ref={drop} className='list'>
      {children}
    </div>
  );
};

export default List;
