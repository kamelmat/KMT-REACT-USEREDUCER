import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import contactListService from '../services/contactListService';
import ContactCard from '../components/ContactCard';
import { Link } from "react-router-dom";

const ContactList = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        const loadContacts = async () => {
            if (!store.agenda) {
                console.log("No agenda set, skipping contact load.");
                return;
            }

            try {
                const contacts = await contactListService.getContacts(store.agenda);
                if (Array.isArray(contacts)) {
                    dispatch({ type: 'SET_CONTACTS', payload: contacts });
                    console.log("Contacts loaded:", contacts);
                } else {
                    dispatch({ type: 'SET_CONTACTS', payload: [] });
                    console.log("No contacts found.");
                }
            } catch (error) {
                alert('Error loading contacts.');
                console.error(error);
                dispatch({ type: 'SET_CONTACTS', payload: [] });
            }
        };
        loadContacts();
    }, [store.agenda, dispatch]);


    const handleSaveContact = async () => {
        if (!store.name || !store.phone) {
            alert('Name and phone are required!');
            return;
        }
        try {
            const contactData = {
                name: store.name,
                phone: store.phone,
                email: store.email,
                address: store.address,
            };

            if (store.editMode) {
                await contactListService.updateContact(store.agenda, store.editId, contactData);
                alert('Contact updated successfully!');
                dispatch({ type: 'UPDATE_CONTACT', payload: { ...contactData, id: store.editId } });
                dispatch({ type: 'SET_EDIT_MODE', value: false });
                dispatch({ type: 'SET_EDIT_ID', value: null });
            } else {
                const newContact = await contactListService.createContact(store.agenda, contactData);
                dispatch({ type: 'ADD_CONTACT', payload: newContact });
                alert('Contact added successfully!');
            }

            dispatch({ type: 'SET_NAME', value: '' });
            dispatch({ type: 'SET_PHONE', value: '' });
            dispatch({ type: 'SET_EMAIL', value: '' });
            dispatch({ type: 'SET_ADDRESS', value: '' });
            dispatch({ type: 'TOGGLE_FORM', value: false });

        } catch (error) {
            alert('Error saving contact.');
            console.error(error);
        }
    };


    const handleDelete = async (contactId) => {
        try {
            await contactListService.deleteContact(store.agenda, contactId);
            dispatch({ type: 'DELETE_CONTACT', payload: contactId });
            alert('Contact deleted successfully!');
        } catch (error) {
            alert('Error deleting contact.');
            console.error(error);
        }
    };

    const handleEdit = (contact) => {
        dispatch({ type: 'SET_NAME', value: contact.name });
        dispatch({ type: 'SET_PHONE', value: contact.phone });
        dispatch({ type: 'SET_EMAIL', value: contact.email });
        dispatch({ type: 'SET_ADDRESS', value: contact.address });
        dispatch({ type: 'TOGGLE_FORM', value: true });
        dispatch({ type: 'SET_EDIT_MODE', value: true });
        dispatch({ type: 'SET_EDIT_ID', value: contact.id });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Contacts for Agenda: {store.agenda}</h1>
            <div className="text-center mb-4">
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_FORM', value: !store.showForm })}
                    className={`btn ${store.showForm ? 'btn-secondary' : 'btn-success'}`}
                >
                    {store.showForm ? 'Hide Form' : 'Add New Contact'}
                </button>
                <div className="mt-3">
                    <Link to="/" className="text-decoration-none">Get back</Link>
                </div>
            </div>
            {store.showForm && (
                <div className="card p-3 mb-4">
                    <h4 className="mb-3">New Contact</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Full Name"
                            value={store.name}
                            onChange={(e) => dispatch({ type: 'SET_NAME', value: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Phone"
                            value={store.phone}
                            onChange={(e) => dispatch({ type: 'SET_PHONE', value: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={store.email}
                            onChange={(e) => dispatch({ type: 'SET_EMAIL', value: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Address"
                            value={store.address}
                            onChange={(e) => dispatch({ type: 'SET_ADDRESS', value: e.target.value })}
                        />
                        <button onClick={handleSaveContact} className="btn btn-primary w-100">
                            {store.editMode ? 'Editar' : 'Guardar'}
                        </button>
                    </div>
                </div>
            )}
            <div className="contact-list">
                {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                    <div className="row">
                        {store.contacts.map((contact) => (
                            <div key={contact.id} className="col-md-4 mb-3">
                                <ContactCard
                                    contactName={contact.name}
                                    contactEmail={contact.email}
                                    contactPhone={contact.phone}
                                    contactAddress={contact.address}
                                    onDelete={() => handleDelete(contact.id)}
                                    onEdit={() => handleEdit(contact)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted">No contacts found. Add your first contact!</p>
                )}
            </div>
        </div>

    );
};

export default ContactList;
