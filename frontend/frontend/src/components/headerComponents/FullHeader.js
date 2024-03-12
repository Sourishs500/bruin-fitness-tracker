import ProfilePic from './profilePic.js';
import { Link }  from 'react-router-dom'
import { useState, useRef } from 'react';

//To-Do: Implementing the profile pic feature

const FullHeader = ({username, photo}) =>
{ 
    console.log("from FullHeader:", photo)
    
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
        <div style={{height: 80, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <Link to={{pathname: "/", state: {current_username: message_username.current}}} style = {{color: '#0000cc'}} >
                <div className="titleText" >{"Bruin Fitness Tracker"}</div>
            </Link>
            <div style={{marginLeft:40, display: "flex", flexDirection: "row", alignItems: "center",  marginTop:"20px"}}>
                <Link style={{marginLeft:20, marginRight:20, color: '#0000cc'}} 
                    to={{pathname: "/", state: {current_username: message_username.current}} }>
                    <div className="headerPageText"><p>Home</p></div>
                </Link>     
    
                <Link style={{marginLeft:20, marginRight:20, color: '#0000cc'}} 
                    to={{pathname: "/directions", state: {current_username: message_username.current}} }>
                <div className="headerPageText"><p>Directions</p></div>
                </Link>

                <Link style={{marginLeft:20, marginRight:20, color: '#0000cc'}} 
                    to={{pathname: "/history", state: {current_username: message_username.current}} }>
                <div className="headerPageText"><p>History</p></div>
                </Link>
                </div>
            <div className="topBarRight">
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