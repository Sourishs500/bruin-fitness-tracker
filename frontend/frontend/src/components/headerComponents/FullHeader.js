import ProfilePic from './profilePic.js';
import {Link} from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';

//To-Do: Implementing the profile pic feature

export default function FullHeader()
{
    const [logInStatus, setLogInStatus] = useState(false);
    const [username, setUsername] = useState(""); 

    return (
        <div style={{height: 80, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Link to="/" style = {{color: '#0000cc'}}>
                <div className="titleText" >{"Bruin Fitness Tracker"}</div>
            </Link>
            <div className="topBarRight" >
                <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                    <div className="usernameText" style={{marginLeft:"15px"}}> username: not logged in</div>
                    <Link to="/login" style = {{color: '#0000cc'}}> 
                        <div className="usernameText" style={{marginLeft:"15px"}}>{"sign in"}</div> 
                    </Link>
                </div>
                <div>
                    <ProfilePic/>
                </div>    
            </div>
        </div>
    )
}