import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetContactsQuery, useAddContactMutation } from '../api/contactsApi';
import { addContact, deleteContact, setFilter } from '../redux/contactsSlice';
import ContactForm from './PhoneBook/PhoneBookContactForm';
import ContactList from './PhoneBook/PhoneBookContactList';
import 'index.css';

const App = () => {
  const dispatch = useDispatch();
  const { data: contacts } = useGetContactsQuery();
  const [addContactMutation] = useAddContactMutation();

  useEffect(() => {
    if (contacts) {
      dispatch(setFilter('')); 
    }
  }, [contacts, dispatch]);

  const handleAddContact = async (newContact) => {
    try {
      const { data: addedContact } = await addContactMutation(newContact);
      dispatch(addContact(addedContact));
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a Contact</h2>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <ContactList contacts={contacts || []} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;