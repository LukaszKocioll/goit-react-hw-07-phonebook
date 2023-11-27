import { configureStore } from '@reduxjs/toolkit';
import contactsReducer, { fetchContacts } from '../redux/contactsSlice';
import { api } from '../api/contactsApi';  

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    [api.reducerPath]: api.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),  
});

store.dispatch(fetchContacts()); 

export default store;
