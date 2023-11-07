import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://6549a5dee182221f8d51bdc6.mockapi.io';

export const fetchContactsAsync = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await axios.get(`${API_URL}/contacts`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching contacts');
  }
});

export const addContactAsync = createAsyncThunk('contacts/addContact', async (newContact) => {
  try {
    const response = await axios.post(`${API_URL}/contacts`, newContact);
    return response.data;
  } catch (error) {
    throw new Error('Error adding contact');
  }
});


export const deleteContactAsync = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  try {
    await axios.delete(`${API_URL}/contacts/${contactId}`);
    return contactId;
  } catch (error) {
    throw new Error('Error deleting contact');
  }
});


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      });
  },
});


export const { reducer: contactsReducer } = contactsSlice;
export { fetchContactsAsync, addContactAsync, deleteContactAsync };
