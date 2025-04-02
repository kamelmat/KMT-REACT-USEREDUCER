import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import contactListService from '../services/contactListService';

const HomeScreen = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [agendaName, setAgendaName] = useState('');

    const handleCheckOrCreateAgenda = async () => {
        if (agendaName.trim() === '') {
            alert('Please enter a valid agenda name.');
            return;
        }
        try {
            const response = await contactListService.getContacts(agendaName);
            if (response.length === 0) {
                await contactListService.createAgenda(agendaName);
                alert('Agenda created successfully!');
            } else {
                alert('Agenda found! Loading contacts...');
            }
            dispatch({ type: 'SET_AGENDA', value: agendaName });
            navigate('/contacts');
        } catch (error) {
            alert('Error checking or creating agenda.');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>Welcome to Agenda</h1>
            <h2>Enter your agenda name:</h2>
            <input
                type="text"
                placeholder="Agenda Name"
                value={agendaName}
                onChange={(e) => setAgendaName(e.target.value)}
            />
            <button onClick={handleCheckOrCreateAgenda}>Continue</button>
        </div>
    );
};

export default HomeScreen;
