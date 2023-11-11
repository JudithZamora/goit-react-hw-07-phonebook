// app.js

import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsAsync, addContactAsync, deleteContactAsync, setFilter } from './slices/contactsSlice';

const App = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    // Cargar contactos al montar el componente
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert('Contact already exists!');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    dispatch(addContactAsync(newContact));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={(value) => dispatch(setFilter(value))} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContactAsync} />
    </div>
  );
};

export default App;
