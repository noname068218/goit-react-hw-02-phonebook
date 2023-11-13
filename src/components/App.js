import React, { Component } from 'react';
import { GlobalStyle } from '../Global';
import { nanoid } from 'nanoid';
import { Layout } from './Loyout';
import { ContactForm } from './PhoneForm';
import { Section } from './PhoneTitel/PhoneTitel';
import { ContactList } from './FormList/From.List';
import { SearchBar } from './SearchBar';

const initialFilters = {
  name: '',
  number: '',
};

export class App extends Component {
  state = {
    contacts: [],
    filter: initialFilters,
  };

  addContact = newContact => {
    const isNameExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isNameExist) {
      alert('Contact with this name already exists!');
      return;
    }

    const quiz = {
      ...newContact,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, quiz],
    }));
  };
  deleteItem = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(item => item.id !== contactId),
      };
    });
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
    const { contacts, filter } = this.state;
    const visibleContacts = contacts.filter(item => {
      const hasName = item.name
        .toLowerCase()
        .includes(filter.name.toLowerCase());
      return hasName;
    });

    return (
      <Layout>
        <Section title="adadad">
          <ContactForm onAdd={this.addContact} />
          <SearchBar filter={filter} onSearch={this.handleFilterChange} />
        </Section>
        <Section title="Contacts">
          <ContactList contacts={visibleContacts} onDelete={this.deleteItem} />
        </Section>
        <GlobalStyle />
      </Layout>
    );
  }
}
