import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import FullHeader from  '../components/headerComponents/FullHeader.js' 

const Login = () => {

    const username = useRef();
    const password = useRef();
    const user = useRef();

    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"240px", height:"40px", marginTop:"5px"}} 
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    const fetchAccount = async (name) => {
        const path = '/api/user/getUser/'.concat("", name)
        console.log(name)
        const response = await fetch(path)
        const json = await response.json()

        if (response.ok){
            user.current = json;
        }
    }
        
    const VerifyAccount = async () => {
        //console.log(username.current.value);
        //console.log(password.current.value);
        //console.log(user); 

        const u = await fetchAccount(username.current.value);
        console.log(user.current);
        //console.log(user[0].password);
        if ((user.current)[0].password != password.current.value) {
            console.log("wrong password or username");
        }
        else {
            console.log("hooray!");
        }

    }

    return (
    <>
    <div style={{ backgroundColor: '#6699ff' }}><FullHeader/></div>
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
    </>  
    )
}

export default Login;