import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import kirby from '../components/headerComponents/kirby.png'
import Popup from 'reactjs-popup';


const ProfilePage = ({username}) => {
    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"240px", height:"40px", marginTop:"5px"}}
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    const user = useRef();
    const current_username = useRef();
    const gender = useRef();
    const password = useRef();

    async function fetchAccount(name) {
        try {
            const path = '/api/user/getUser/'.concat("", name)
            const response = await fetch(path)
            const json = await response.json()
            if (json.length == 1) { 
                //console.log("JSON[0]:",json[0]); 
                user.current = json[0];
            } 
            else {
                user.current = [];
                console.log("Username doesn't exist.");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const VerifyAccount = async () => {
        if (username) {
            //console.log("USERNAME:", username);
            const u = await fetchAccount(username, user);
            console.log("???:", user.current);
            if (user.current) {
                current_username.current = (user.current).username;
                gender.current = (user.current).gender;
                password.current = (user.current).password;
                console.log("YAY");
            }
            else {
                console.log("HHU?g!");
            }
        }
        else {
            console.log("Something went wrong!");
        }
    }

    VerifyAccount();

    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop:"20px"}}>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginRight:"20px"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"Your Account"}</div>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"username"}</div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{current_username.current}</div>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"gender"}</div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{gender.current}</div>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"password"}</div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{password.current}</div>
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{"idk profile picture"}</div>
                <img className="largeProfilePicture" style = {{marginTop:"10px"}} src={kirby}/>
            </div>
            {/* <Popup trigger=
                {<button> Change Profile Picture </button>} 
                modal nested> {
                    close => (
                        <div className='modal'>
                            <div className="biggerText"> Welcome! </div>
                            <div>
                                <button onClick= {() => close()}> Close modal </button>
                            </div>
                        </div>
                    )
                }
            </Popup> */}
        </div>
        </div>
    )
}

export default ProfilePage;