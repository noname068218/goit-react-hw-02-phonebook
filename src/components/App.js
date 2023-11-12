import React, { Component } from 'react';
import { GlobalStyle } from '../Global';
import { nanoid } from 'nanoid';
import { Layout } from './Loyout';
import { ContactForm } from './PhoneForm';
import { Section } from './PhoneTitel/PhoneTitel';
import { ContactList } from './FormList/From.List';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  addContact = newContact => {
    const quiz = {
      ...newContact,
      id: nanoid(),
    };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, quiz],
      };
    });
    console.log(quiz);
  };

  render() {
    const { contacts } = this.state;

    return (
      <Layout>
        <Section title="adadad">
          <ContactForm onAdd={this.addContact} />
        </Section>

        <Section title="Contacts">
          <ContactList contacts={contacts} />
        </Section>
        <GlobalStyle />
      </Layout>
    );
  }
}
