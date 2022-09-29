import ContactElement from './ContactElements';
import style from '../phonebook/phonebook.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, filterValue }) => {
  const filteredContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  return (
    <div className={style.contacts}>
      <ul className={style.contacts_list}>
        {filteredContact().map(filcontact => (
          <ContactElement key={filcontact.id} contact={filcontact} />
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterValue: PropTypes.string.isRequired,
};

export default ContactList;
