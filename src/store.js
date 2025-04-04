const initialStore = {
  agenda: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  showForm: false,
  contacts: [],
  editMode: false,
  editId: null,
};

const storeReducer = (store, action) => {
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

    case 'TOGGLE_FORM':
      return { ...store, showForm: action.value };

    case 'SET_CONTACTS':
      return { ...store, contacts: action.payload };

    case 'ADD_CONTACT':
      return { ...store, contacts: [...store.contacts, action.payload] };

    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload),
      };

    case 'CLEAR_AGENDA':
      return { ...store, agenda: '', contacts: [] };

    case 'UPDATE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case 'SET_EDIT_MODE':
      return { ...store, editMode: action.value };

    case 'SET_EDIT_ID':
      return { ...store, editId: action.value };


    default:
      return store;
  }
};

export { initialStore, storeReducer };
