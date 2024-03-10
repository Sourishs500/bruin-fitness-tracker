import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

const NewAccount = ({username}) => {
    const new_username = useRef();
    const gender = useRef();
    const password = useRef();
    const password2 = useRef();
    const genderOptions = ["female", "male", "nonbinary", "prefer not to say"];
    const genderCount = [...Array(genderOptions.length).keys()];
    const completeUser = useRef({});
    const [message, setMessage] = useState("");

    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"240px", height:"40px", marginTop:"5px"}}
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    async function usernameExists(name) {
        const path = '/api/user/getUser/'.concat("", name)
        const response = await fetch(path)
        const json = await response.json()
        if (json.length > 0) { 
            return true;
        } 
        else {
            return false;
        }
    }

    const handleCreateAccount = async (e) => {
        completeUser.current = {"username":new_username.current.value, "password":password.current.value, "gender":gender.current.value};
        const response = await fetch('/api/user/createUser', {
            method: 'POST',
            body: JSON.stringify(completeUser.current),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);

        if(!response.ok) {
            console.log(json.error)
        } else {
            console.log('User added to the backend.')
            setMessage("Successfully created a new account!");
        }
    }

    const handleButton = async () => {
        //console.log("return value of usernameExists:", await usernameExists(new_username.current.value));
        if (username) {
            setMessage("Already signed in, no need to create an account.");
        } else if (await usernameExists(new_username.current.value)) {
            setMessage("Username already taken. Please choose a different one.");
        } else if (password.current.value != password2.current.value) {
            setMessage("Passwords must match.");
        }
        else { handleCreateAccount(); }
        
    }

    return (
        <>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
                <div className="generalText" style = {{alignSelf:"center", marginTop:"20px"}} >
                    {"Have an account? "} <Link to="/login" style = {{color: '#0000cc'}}> Sign in</Link>{"!"}
                </div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"username"}</div>
                <div> <Box val={new_username}/> </div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"gender"}</div>
                <div> 
                    <select ref={gender} style={{"width":"240px", height:"40px", marginTop:"10px"}}
                        onClick={(e)=>{gender.current.value = e.target.value}}>  
                        {genderCount.map(gen => <option key={gen} value={genderOptions[gen]}> {genderOptions[gen]} </option>)} 
                    </select> 
                </div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"password"}</div>
                <div> <Box val={password}/> </div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"confirm password"}</div>
                <div> <Box val={password2}/> </div>
                <div ><Button size="sm" variant="outline-primary" onClick={() => handleButton()} 
                style={{"width": "120px", height:"40px", marginTop:"20px",
                fontFamily: "Trebuchet MS", fontSize: "20px"}}> Submit</Button>
                </div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{message}</div>
            </div>
        </div>
        </>
    )
}

export default NewAccount;