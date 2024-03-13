import ProfilePic from './profilePic.js';
import { Link }  from 'react-router-dom'
import { useState, useRef } from 'react';

//To-Do: Implementing the profile pic feature

const FullHeader = ({username, photo, goldStarCount, platStarCount}) =>
{ 
    console.log("from FullHeader:", photo)
    const message_username = useRef();
    
    if (username != "") {
        message_username.current = username;
    }
    else {
        message_username.current = "not signed in";
    }

    //onClick={() => handleClick()}
    return (
        <div style={{minHeight: 80, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <Link to={{pathname: "/", state: {current_username: message_username.current}}} style = {{color: '#ffffff'}} >
                <div className="titleText" >{"Bruin Fitness Tracker"}</div>
            </Link>
            <div style={{marginLeft:20, display: "flex", flexDirection: "row", alignItems: "center",  marginTop:"20px"}}>
                <Link style={{marginLeft:20, marginRight:20, color: '#ffffff'}} 
                    to={{pathname: "/", state: {current_username: message_username.current}} }>
                    <div className="headerPageText"><p>Home</p></div>
                </Link>     
    
                <Link style={{marginLeft:20, marginRight:20, color: '#ffffff'}} 
                    to={{pathname: "/directions", state: {current_username: message_username.current}} }>
                <div className="headerPageText"><p>Directions</p></div>
                </Link>

                <Link style={{marginLeft:20, marginRight:20, color: '#ffffff'}} 
                    to={{pathname: "/history", state: {current_username: message_username.current}} }>
                <div className="headerPageText"><p>History</p></div>
                </Link>
                </div>
            <div className="topBarRight">
                <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                    <div className="usernameText" style={{marginLeft:"15px", color: '#ffffff'}}> username: {message_username.current}</div>
                    <Link to="/login" style = {{color: '#ffffff'}}>
                        <div className="usernameText" 
                        style={{marginLeft:"15px"}}>  
                        {"sign in"}
                        </div> 
                     </Link>
                </div>
                <div>
                    <ProfilePic username={username} photo={photo} goldStarCount={goldStarCount} platStarCount={platStarCount}/>
                </div>    
            </div>
        </div>
    )
};

export default FullHeader;