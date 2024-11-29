import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './../pages/home/index';
import PublicLayout from '../components/layouts/publicLayout';

const PublicRoutes = () => {
  return (
    <Routes>
        <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
        </Route>
    </Routes>
  );
}

export default PublicRoutes;
