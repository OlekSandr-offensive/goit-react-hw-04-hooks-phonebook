import React from 'react';
import shortid from 'shortid';
import './App.css';
import ContactList from './components/contacts/ContactList';
import initialContacts from './contacts.json';
import ContactForm from './components/contactForm/ContactForm';
import Filter from './components/filter/Filter';

class App extends React.Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  FormSubmitHandler = ({ name, number }) => {
    const { contacts } = this.state;
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
      this.setState(({ contacts }) => ({
        contacts: [AddContact, ...contacts],
      }));
    }
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.FormSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContacts={this.deleteContacts}
        />
      </div>
    );
  }
}

export default App;
