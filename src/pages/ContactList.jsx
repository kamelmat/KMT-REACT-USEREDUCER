import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import contactListService from '../services/contactListService';
import ContactCard from '../components/ContactCard';

const ContactList = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [contact, setContact] = useState({ name: '', phone: '', email: '', address: '' });

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const contacts = await contactListService.getContacts(store.agenda);
                dispatch({ type: 'SET_CONTACTS', payload: contacts });
            } catch (error) {
                alert('Error loading contacts.');
                console.error(error);
            }
        };
        loadContacts();
    }, [store.agenda, dispatch]);

    const handleDeleteContact = async (contactId) => {
        try {
            await contactListService.deleteContact(store.agenda, contactId);
            dispatch({ type: 'DELETE_CONTACT', payload: contactId });
            alert('Contact deleted successfully!');
        } catch (error) {
            alert('Error deleting contact.');
            console.error('Error deleting contact:', error);
        }
    };

    const handleEditContact = (contact) => {
        setContact(contact);
        setIsEditing(true);
    };

    const handleSaveContact = async () => {
        if (!contact.name || !contact.phone) {
            alert('Name and phone are required!');
            return;
        }
        try {
            if (isEditing) {
                await contactListService.updateContact(store.agenda, contact.id, contact);
                alert('Contact updated successfully!');
            } else {
                const newContact = await contactListService.createContact(store.agenda, contact);
                dispatch({ type: 'ADD_CONTACT', payload: newContact });
                alert('Contact added successfully!');
            }
            setContact({ name: '', phone: '', email: '', address: '' });
            setIsEditing(false);
        } catch (error) {
            alert('Error saving contact.');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Contact List</h1>
                <h2>{isEditing ? 'Edit Contact' : 'Add New Contact'}</h2>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                />
                <button onClick={handleSaveContact}>{isEditing ? 'Update' : 'Save'}</button>
            </div>
            <div className="contact-list">
                {store.contacts.map((contact) => (
                    <ContactCard
                        key={contact.id}
                        contactName={contact.name}
                        contactEmail={contact.email}
                        contactPhone={contact.phone}
                        contactAddress={contact.address}
                        onEdit={() => handleEditContact(contact)}
                        onDelete={() => handleDeleteContact(contact.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContactList;
