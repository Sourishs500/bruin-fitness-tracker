import { useEffect, useState, useRef } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import NewAccount from './pages/NewAccount'

export default function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/"
                    element={<Home/>}
                />
                <Route 
                    path="/login"
                    element={<Login/>}
                />
                <Route 
                    path="/create_new_account"
                    element={<NewAccount/>}
                />
            </Routes>
        </BrowserRouter>
   );
};