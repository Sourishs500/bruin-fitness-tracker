import { useEffect, useState, useRef } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import NewAccount from './pages/NewAccount'
import FullHeader from  './components/headerComponents/FullHeader.js' 

export default function App () {
    const [username, setUsername] = useState("");

    return (
        <BrowserRouter>
            <div style={{ backgroundColor: '#6699ff' }}><FullHeader username={username}/></div>
            <Routes>
                <Route 
                    path="/"
                    element={<Home username={username}/>}
                />
                <Route 
                    path="/login"
                    element={<Login username={username} setUsername={setUsername} />}
                />
                <Route 
                    path="/create_new_account"
                    element={<NewAccount/>}
                />
            </Routes>
        </BrowserRouter>
   );
};