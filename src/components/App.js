import React, { Component } from 'react';
import { GlobalStyle } from '../Global';
import { nanoid } from 'nanoid';
import { Layout } from './Loyout';
import { ContactForm } from './PhoneForm';
import { Section } from './PhoneTitel/PhoneTitel';
import { ContactList } from './FormList/From.List';
import { SearchBar } from './SearchBar';
import { TypeAnimation } from 'react-type-animation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFilters = {
  name: '',
  number: '',
};

export class App extends Component {
  state = {
    contacts: [],
    filter: initialFilters,
    isFormSubmitted: false,
  };

  addContact = newContact => {
    const isNameExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isNameExist) {
      toast.error('Contact with this name already exists!');
      return;
    }

    const quiz = {
      ...newContact,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, quiz],
      isFormSubmitted: true,
    }));
  };

  deleteItem = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== contactId),
    }));
  };

  handleFilterChange = event => {
    const { value } = event.target;
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        name: value,
      },
    }));
  };

  render() {
    const { contacts, filter, isFormSubmitted } = this.state;
    const visibleContacts = contacts.filter(item => {
      const hasName = item.name
        .toLowerCase()
        .includes(filter.name.toLowerCase());
      return hasName;
    });

    return (
      <Layout>
        <Section title="Phonebook">
          <TypeAnimation
            sequence={[
              'To create an entry, enter the name',
              1000,
              'To create an entry, enter the number',
              1000,
              'Press the button',
              1000,
              'I believe in you',
              1000,
            ]}
            speed={50}
            style={{ fontSize: '2em' }}
            repeat={Infinity}
          />
          <ContactForm onAdd={this.addContact} />
          {isFormSubmitted && (
            <>
              <SearchBar filter={filter} onSearch={this.handleFilterChange} />
              <Section title="Contacts">
                <ContactList
                  contacts={visibleContacts}
                  onDelete={this.deleteItem}
                />
              </Section>
            </>
          )}
        </Section>
        <GlobalStyle />
        <ToastContainer />
      </Layout>
    );
  }
}
