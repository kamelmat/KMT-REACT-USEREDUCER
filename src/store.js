export const initialStore = () => {
  return {
    agenda: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    contacts: [],
  };
}

export const storeReducer = (store, action) => {
  switch (action.type) {

    case 'SET_AGENDA':
      return { ...store, agenda: action.value };

    case 'SET_NAME':
      return { ...store, name: action.value };

    case 'SET_PHONE':
      return { ...store, phone: action.value };

    case 'SET_EMAIL':
      return { ...store, email: action.value };

    case 'SET_ADDRESS':
      return { ...store, address: action.value };

    case 'ADD_CONTACT':
      return { ...store, contacts: [...store.contacts, action.payload] };

    case 'DELETE_CONTACT':
      return { ...store, contacts: state.contacts.filter(contact => contact.id !== action.payload), };

    case 'SET_CONTACTS':
      return { ...store, contacts: action.payload };

    default:
      return store;
  }
};


