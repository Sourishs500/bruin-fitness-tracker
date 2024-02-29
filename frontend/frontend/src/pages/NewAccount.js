import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

const NewAccount = () => {

    const username = useRef();
    const gender = useRef();
    const password = useRef();
    const password2 = useRef();
    const genderOptions = ["female", "male", "nonbinary", "prefer not to say"];
    const genderCount = [...Array(genderOptions.length).keys()];
    const completeUser = useRef({});

    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"240px", height:"40px", marginTop:"5px"}}
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    const handleCreateAccount = async (e) => {
        // console.log(username.current.value);
        // console.log(gender.current.value);
        // console.log(password.current.value);
        // console.log(password2.current.value);
        
        completeUser.current = {"username":username.current.value, "password":password.current.value, "gender":gender.current.value};
        
        const response = await fetch('/api/user/createUser', {
            method: 'POST',
            body: JSON.stringify(completeUser.current),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok) {
            console.log(json.error)
        } else {
            console.log('User added to the backend.')
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
                <div className="generalText" style = {{alignSelf:"center", marginTop:"20px"}} >
                    {"Have an account? "} <Link to="/login" style = {{color: '#0000cc'}}> Sign in</Link>{"!"}
                </div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"username"}</div>
                <div> <Box val={username}/> </div>
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
                <div ><Button size="sm" variant="outline-primary" onClick={() => handleCreateAccount()} 
                style={{"width": "120px", height:"40px", marginTop:"20px",
                fontFamily: "Trebuchet MS", fontSize: "20px"}}> Submit</Button>
            </div>
            </div>
        </div>
    )
}

export default NewAccount;