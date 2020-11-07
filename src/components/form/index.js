  import { AppContext } from '../../store';
  import { closeModal, onInputChange, saveCard } from '../../store/actions';
  const { useRef, useState, useContext } = require('react');
  const { Title, Button, ButtonSecondary } = require('../../styled');
  const { Input } = require('../../styled/Input');
  const { Textarea } = require('../../styled/Textarea');

  const Renderfield = (props) => {
    switch (props.type) {
      case 'textarea':
        return <Textarea {...props} />;
      default:
        return <Input {...props} />;
    }
  };

  const Form = ({ fields, title }) => {
    const ref = useRef({});
    const [valid, setValid] = useState(false);

    const { state, dispatch } = useContext(AppContext);
    const { selectedCard } = state;

    const onSave = () => {
      dispatch(saveCard());
      close();
    };

    const close = () => dispatch(closeModal());

    const onChange = (e) => {
      dispatch(onInputChange(e));
      if (ref.current.checkValidity && ref.current.checkValidity()) {
        setValid(true);
      } else {
        setValid(false);
      }
    };

    return (
      <div>
        <Title>{title}</Title>
        <form ref={ref} onSubmit={onSave}>
          {fields.map((fld, i) => (
            <Renderfield
              key={'fld_' + i}
              {...fld}
              defaultValue={selectedCard[fld.name] || ''}
              onChange={onChange}
            />
          ))}
        </form>
        <div>
          <ButtonSecondary onClick={close}>Cancel</ButtonSecondary>
          <Button disabled={!valid} onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    );
  };

  export default Form;
