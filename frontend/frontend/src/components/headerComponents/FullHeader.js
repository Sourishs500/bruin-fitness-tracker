import ProfilePic from './profilePic.js';
import { Link }  from 'react-router-dom'
import { useState, useRef } from 'react';
//import fetchDates from '../historyComponents/pastWorkouts.js'
//To-Do: Implementing the profile pic feature

const FullHeader = ({username, photo, setUsername, goldStarCount, platStarCount, setPastDates}) =>
{ 

    const fetchDates = async (username) => {
        let dates = []
        const path = '/api/workouts/allDates/' + username
        const response = await fetch(path)
        const json = await response.json()
        if (!response.ok){
            console.error("Something is wrong with getting dates")
        }else{
            for(let i = 0; i < json.length; i++){
                const cur = json[i]
                const date = cur.date
                dates.push(date)
            }
        }
    
        let numberOfWorkouts = dates.length
        // Check to make sure two digits for month and two for day
        for (let i=0; i < numberOfWorkouts; i++)
        {
            let cur_date = dates[i]; let constructed_date = "";
            let month_digits = cur_date.indexOf("/")
            let day_digits = cur_date.substring(month_digits+1).indexOf("/")
            
            if(month_digits < 2) { constructed_date += "0"} 
            constructed_date += cur_date.substring(0,month_digits) + "/"
    
            if(day_digits < 2) { constructed_date += "0"} 
            constructed_date += cur_date.substring(month_digits+1)
            
            dates[i] = constructed_date
        }
    
        dates.sort()
        let current_date = ""
        let current_date_counter = 0
        for (let i=0; i < numberOfWorkouts; i++)
        {
            // First instance of a new date
            if(current_date != dates[i])  { current_date = dates[i]; current_date_counter = 1 }
            else { current_date_counter += 1 }
    
            // Next instance of a new date
            if(current_date_counter > 1)
            {
                for(let j = 0; j < current_date_counter; j++)
                {
                    dates[i-j] = current_date + " (" + (current_date_counter-j) +")"
                }
            }
        }
    
        // Check to make sure two digits for month and two for day
        for (let i=0; i < numberOfWorkouts; i++)
        {
            let cur_date = dates[i]; let constructed_date = "";
            
            if(cur_date.substring(0,1) == "0") { constructed_date += cur_date.substring(1,3)} 
            else { constructed_date += cur_date.substring(0,3)}
    
            let first_slash = cur_date.indexOf("/")
            if(cur_date.substring(first_slash+1, first_slash+2) == "0") { constructed_date += cur_date.substring(first_slash+2)} 
            else { constructed_date += cur_date.substring(first_slash+1) }
            
            dates[i] = constructed_date
        }
        
        return dates.reverse();
    }
    console.log("from FullHeader:", photo)
    const message_username = useRef();
    const sign_in = (username !== "") ? "" : "sign in"
    const sign_out = (username !== "") ? "sign out" : ""
    if (username != "") {
        message_username.current = username;
    }
    else {
        message_username.current = "not signed in";
    }
    const temp = async () => {
        setPastDates(await fetchDates(username))
    }
    //onClick={() => handleClick()}
    return (
        <div style={{minHeight: 80, display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <Link to={{pathname: "/", state: {current_username: message_username.current}}} style = {{color: '#ffffff'}} >
                <div style={{fontStyle:"italic"}} className="titleText" >{"Bruin Fitness Tracker"}</div>
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
                    to={{pathname: "/history", state: {current_username: message_username.current}} }
                    onClick={() => temp()} >
                <div className="headerPageText"><p>History</p></div>
                </Link>
                </div>
            <div className="topBarRight">
                <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                    <div className="usernameText" style={{marginLeft:"15px", color: '#ffffff'}}> username: {message_username.current}</div>
                    <Link to="/login" style = {{color: '#ffffff'}}>
                        <div className="usernameText" 
                        style={{marginLeft:"15px"}}>  
                        {sign_in}
                        </div> 
                     </Link>
                     <Link to="/" style = {{color: '#ffffff'}} onClick={() => setUsername("")}>
                        <div className="usernameText" 
                        style={{marginLeft:"15px"}}>  
                        {sign_out}
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