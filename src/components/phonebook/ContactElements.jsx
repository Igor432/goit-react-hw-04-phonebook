import style from '../phonebook/phonebook.module.css';
import PropTypes from 'prop-types';
import { useMyContext } from 'components/App';

const ContactElement = ({ contact }) => {
  const onDelete = useMyContext();

  return (
    <li key={contact.id} className={style.contact_item}>
      <p class={style.item_name}>{contact.name} </p>{' '}
      <p class={style.item_number}>{contact.number}</p>
      <button
        id={contact.id}
        class={style.delete_button}
        type="button"
        onClick={onDelete}
      >
        Delete
      </button>
    </li>
  );
};

ContactElement.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactElement;
