import Filter from './phonebook/Filter';
import ContactList from './phonebook/ContactList';
import ContactForm from '../components/phonebook/ContactForm';
import style from './phonebook/phonebook.module.css';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

export const useMyContext = () => useContext(MyContext);
const MyContext = createContext();

function App() {
  const contactList = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(
    contactList ? JSON.parse(localStorage.getItem('contacts')) : []
  );
  const [filter, setFilter] = useState('');

  const onSubmit = contactItem => {
    const result = contacts.find(contact => contact.name === contactItem.name);
    if (result) {
      return Notiflix.Notify.failure('The name already exists!');
    }

    setContacts(state => [...state, contactItem]);
  };

  const onFilter = e => {
    const filterValue = e.target.value;
    setFilter(filterValue);
  };

  const onDelete = e => {
    const target = e.target;
    setContacts(prev => prev.filter(contact => contact.id !== target.id));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log(JSON.parse(localStorage.getItem('contacts')));
  }, [contacts]);

  return (
    <div className={style.App}>
      <h1 className={style.title_tag}>Phonebook</h1>
      <MyContext.Provider value={onDelete}>
        <ContactForm onSubmit={onSubmit} />

        <h2 className={style.title_tag}>Contacts</h2>

        <Filter onFilter={onFilter} />

        <ContactList contacts={contacts} filterValue={filter} />
      </MyContext.Provider>
    </div>
  );
}

export default App;
