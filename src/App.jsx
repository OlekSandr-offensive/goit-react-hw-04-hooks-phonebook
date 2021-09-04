import { useState } from 'react';
import shortid from 'shortid';
import './App.css';
import ContactList from './components/contacts/ContactList';
import initialContacts from './contacts.json';
import ContactForm from './components/contactForm/ContactForm';
import Filter from './components/filter/Filter';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  const FormSubmitHandler = ({ name, number }) => {
    const findContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (findContact) {
      alert(`${name} is already in contacts.`);
    } else {
      const AddContact = {
        id: shortid.generate(),
        name: name,
        number: number,
      };
      setContacts(contacts => [AddContact, ...contacts]);
    }
  };

  const deleteContacts = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={FormSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContacts={deleteContacts}
      />
    </div>
  );
}
