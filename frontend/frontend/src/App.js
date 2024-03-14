import { useEffect, useState, useRef } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import NewAccount from './pages/NewAccount'
import ProfilePage from  './pages/ProfilePage.js' 
import FullHeader from  './components/headerComponents/FullHeader.js'
import DirectionsPage from './pages/DirectionsPage.js'
import HistoryPage  from './pages/HistoryPage.js';
import * as CryptoJS from 'crypto-js';

export default function App () {
    const [username, setUsername] = useState("");
    const [photo, setPhoto] = useState("");
    const [goldStarCount, setGoldStar] = useState(0);
    const [platStarCount, setPlatStar] = useState(0);
    const [pastDates, setPastDates] = useState([]);
    const [password, updatePassword] = useState("");
    const [hashed, setHashed] = useState("")
    // console.log("APP")
    // console.log(platStarCount)
    // console.log(goldStarCount)
    
    //setHashed(hashed_version())
    //setUsername(hashed_version_of_password(password));

    return (
        <BrowserRouter>
            <div style={{ backgroundColor: '#1e3373' }}><FullHeader 
                username={username} 
                setUsername={setUsername} 
                photo={photo} 
                goldStarCount={goldStarCount} 
                platStarCount={platStarCount} 
                setPastDates={setPastDates}
                    encrypted={hashed}
                /></div>
            <Routes>
                <Route 
                    path="/"
                    element={<Home username={username} setGoldStar={setGoldStar} setPlatStar={setPlatStar} encrypted={hashed} />}
                />
                <Route 
                    path="/directions"
                    element={<DirectionsPage username={username} />}
                />
                <Route 
                    path="/history"
                    element={<HistoryPage username={username} pastDates={pastDates} encrypted={hashed} />}
                />
                <Route 
                    path="/login"
                    element={<Login username={username} setUsername={setUsername} setPhoto={setPhoto} setGoldStar={setGoldStar} setPlatStar={setPlatStar} setHashed={setHashed}/>}
                />
                <Route 
                    path="/create_new_account"
                    element={<NewAccount username={username}/> }
                />
                <Route 
                    path="/profile_page"
                    element={<ProfilePage username={username} photo={photo} setPhoto={setPhoto} encrypted={hashed} /> }
                />
            </Routes>
        </BrowserRouter>
   );
};