import React, { useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { addContactAsync, deleteContactAsync, fetchContactsAsync, setFilter } from './slices/contactsSlice';

const App = () => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const filter = useSelector((state) => state.contacts.filter);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  const handleAddContact = async ({ name, number }) => {
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert('Contact already exists!');
      return;
    }

    await dispatch(addContactAsync({ name, number }));
  };

  const handleDeleteContact = async (id) => {
    await dispatch(deleteContactAsync(id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={(value) => dispatch(setFilter(value))} />
      <ContactList contacts={filteredContacts} deleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;