import { useEffect, useState, useRef } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import NewAccount from './pages/NewAccount'
import ProfilePage from  './pages/ProfilePage.js' 
import FullHeader from  './components/headerComponents/FullHeader.js'

export default function App () {
    const [username, setUsername] = useState("");
    const [photo, setPhoto] = useState("");

    return (
        <BrowserRouter>
            <div style={{ backgroundColor: '#6699ff' }}><FullHeader username={username}  photo={photo}/></div>
            <Routes>
                <Route 
                    path="/"
                    element={<Home username={username}/>}
                />
                <Route 
                    path="/login"
                    element={<Login username={username} setUsername={setUsername} setPhoto={setPhoto} />}
                />
                <Route 
                    path="/create_new_account"
                    element={<NewAccount username={username}/> }
                />
                <Route 
                    path="/profile_page"
                    element={<ProfilePage username={username} photo={photo}/> }
                />
            </Routes>
        </BrowserRouter>
   );
};