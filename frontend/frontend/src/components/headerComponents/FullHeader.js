import ProfilePic from './profilePic.js';
import { Link }  from 'react-router-dom'
import { useState, useRef } from 'react';

//To-Do: Implementing the profile pic feature

const FullHeader = ({username, photo}) =>
{ 
    console.log("from FullHeader:", username)
    
    const message_username = useRef();
    const message_signin = useRef();
    
    if (username != "") {
        message_username.current = username;
        message_signin.current = "sign out";
    }
    else {
        message_username.current = "not signed in";
        message_signin.current = "sign in";
    }

    return (
        <div style={{height: 80, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Link to={{pathname: "/", state: {current_username: message_username.current}}} style = {{color: '#0000cc'}} >
                <div className="titleText" >{"Bruin Fitness Tracker"}</div>
            </Link>
            <div className="topBarRight" >
                <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                    <div className="usernameText" style={{marginLeft:"15px"}}> username: {message_username.current}</div>
                    <Link to="/login" style = {{color: '#0000cc'}}> 
                        <div className="usernameText" style={{marginLeft:"15px"}}>{message_signin.current}</div> 
                    </Link>
                </div>
                <div>
                    <ProfilePic username={username} photo={photo}/>
                </div>    
            </div>
        </div>
    )
};

export default FullHeader;