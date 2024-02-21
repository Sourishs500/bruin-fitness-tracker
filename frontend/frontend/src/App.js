import { useEffect, useState, useRef } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import FullHeader from  './components/headerComponents/FullHeader.js'
import Login from './pages/Login'

export default function App () {
    return (
        <BrowserRouter>
            <div style={{ backgroundColor: 'pink' }}><FullHeader/></div>
            <Routes>
                <Route 
                    path="/"
                    element={<Home/>}
                />
                <Route 
                    path="/login"
                    element={<Login/>}
                />
            </Routes>
        </BrowserRouter>
   );
};