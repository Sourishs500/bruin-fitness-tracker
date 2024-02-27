import ProfilePic from './profilePic.js';
import {Link} from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';

//To-Do: Implementing the profile pic feature

export default function FullHeader()
{
    const [logInStatus, setLogInStatus] = useState(false);
    const [username, setUsername] = useState(""); 

    return (
        <div style={{height: 90, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Link to="/">
                <div className="titleText" >{"Bruin Fitness Tracker"}</div>
            </Link>
            <div className="topBarRight" >
                <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                    <div className="usernameText" style={{marginLeft:"15px"}}> username: Not Logged In</div>
                    <Link to="/login"> 
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