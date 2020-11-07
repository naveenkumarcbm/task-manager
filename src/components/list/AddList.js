import { useState, useContext } from 'react';
import { AppContext } from '../../store';
import { addNewList } from '../../store/actions';
import { Button } from '../../styled';
import { Input } from '../../styled/Input';

const AddList = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(AppContext);

  const addNew = () => {
      dispatch(addNewList(title));
      setIsAdd(!isAdd); 
  }
  return (
    <>
      {isAdd ? (
        <form onSubmit={addNew}>
          <Input
            placeholder='List Name'
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button className="btn-list" disabled={title === ''} onClick={addNew}>Save List</Button>
        </form>
      ) : (
        <Button className="btn-list" onClick={() => setIsAdd(!isAdd)}>Add List</Button>
      )}
    </>
  );
};

export default AddList;
