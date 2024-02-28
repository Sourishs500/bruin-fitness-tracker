import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

const Login = () => {

    const username = useRef();
    const password = useRef();
    const users = useRef();

    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"240px", height:"40px", marginTop:"5px"}} 
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await fetch('/api/user/getUser')
            const json = await response.json()

            if (response.ok){
                users = json;
            }
        }
        fetchAccounts();
    }, [])
        
    function VerifyAccount() {
        console.log(username.current.value);
        console.log(password.current.value);
        //console.log(users); 
    }

    return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
        <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
            <div className="generalText" style = {{alignSelf:"center", marginTop:"20px"}} >
                {"No account? "} <Link to="/create_new_account" style = {{color: '#0000cc'}} > Sign up</Link>{"!"}
            </div>
            <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"username/email"}</div>
            <div> <Box val={username}/> </div> 
            <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"password"}</div>
            <div> <Box val={password}/> </div>
            <div ><Button size="sm" variant="outline-primary" onClick={() => VerifyAccount()} 
                style={{"width": "120px", height:"40px", marginTop:"20px",
                fontFamily: "Trebuchet MS", fontSize: "20px"}}> Submit</Button>
            </div>
        </div>
    </div>
    
        
    )
}

export default Login;