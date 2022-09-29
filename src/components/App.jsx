import Filter from './phonebook/Filter';
import ContactList from './phonebook/ContactList';
import ContactForm from '../components/phonebook/ContactForm';
import { nanoid } from 'nanoid';
import style from './phonebook/phonebook.module.css';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

export const useMyContext = () => useContext(MyContext);
const MyContext = createContext();

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts'))
  );
  const [filter, setFilter] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const numberVal = e.target.number.value;

    const result = contacts.find(contact => contact.name === name);
    if (result) {
      return Notiflix.Notify.failure('The name already exists!');
    }

    setContacts(state => [
      ...state,
      { id: nanoid(), name: name, number: numberVal },
    ]);
    e.target.reset();
  };

  const onFilter = e => {
    const filterValue = e.target.value;
    setFilter(filterValue);
  };

  const onDelete = e => {
    const target = e.target;
    setContacts(contacts.filter(contact => contact.id !== target.id));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log(JSON.parse(localStorage.getItem('contacts')));
  }, [contacts]);

  return (
    <div className={style.App}>
      <h1 className={style.title_tag}>Phonebook</h1>

      <ContactForm onSubmit={onSubmit} />

      <h2 className={style.title_tag}>Contacts</h2>

      <Filter onFilter={onFilter} />
      <MyContext.Provider value={onDelete}>
        <ContactList contacts={contacts} filterValue={filter} />
      </MyContext.Provider>
    </div>
  );
}

export default App;
