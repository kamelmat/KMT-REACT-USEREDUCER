import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import ContactList from './pages/ContactList';
import ErrorPage from './components/ErrorPage';
import { StoreProvider } from './hooks/useGlobalReducer';

const AppRoutes = () => {
  return (
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
  );
};

export default AppRoutes;
