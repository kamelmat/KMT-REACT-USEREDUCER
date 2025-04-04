import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import contactListService from '../services/contactListService';

const HomeScreen = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleCheckOrCreateAgenda = async () => {
        if (store.agenda.trim() === '') {
            alert('Please enter a valid agenda name.');
            return;
        }
        try {
            const response = await contactListService.getAgenda(store.agenda);
            console.log("Response from getAgenda:", response);

            if (response?.detail?.includes("doesn't exist")) {
                await contactListService.createAgenda(store.agenda);
                alert(`Agenda ${store.agenda} created successfully!`);
            } else {
                alert('Agenda found! Loading contacts...');
            }

            dispatch({ type: 'SET_AGENDA', value: store.agenda });
            navigate(`/contacts/${store.agenda}`);
        } catch (error) {
            if (error.message.includes("404")) {
                try {
                    await contactListService.createAgenda(store.agenda);
                    alert(`Agenda ${store.agenda} created successfully!`);
                    dispatch({ type: 'SET_AGENDA', value: store.agenda });
                    navigate('/contacts');
                } catch (createError) {
                    alert('Error creating the agenda.');
                    console.error("Error in handleCheckOrCreateAgenda:", createError);
                }
            } else {
                alert('Error checking agenda.');
                console.error("Error in handleCheckOrCreateAgenda:", error);
            }
        }
    };


    const addAgenda = async () => {
        if (store.agenda.trim() === '') {
            alert('Please enter a valid agenda name.');
            return;
        }
        await handleCheckOrCreateAgenda();
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="mb-4">Welcome to the Contacts Agenda</h1>
                <h2 className="mb-3">Enter your agenda name:</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Agenda Name"
                        value={store.agenda}
                        onChange={(e) => dispatch({ type: 'SET_AGENDA', value: e.target.value })}
                    />
                </div>
                <button onClick={addAgenda} className="btn btn-primary">Continue</button>
            </div>
        </div>

    );
};

export default HomeScreen;
