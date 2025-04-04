import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import ContactList from './pages/ContactList';
import ErrorPage from './components/ErrorPage';

const AppRoutes = () => {
  return (
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/contacts/:agenda" element={<ContactList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
  );
};

export default AppRoutes;
