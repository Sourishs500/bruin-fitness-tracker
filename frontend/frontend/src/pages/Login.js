import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

const Login = () => {

    function Box(/*{dateFunc}*/)
    {
        const [value, setValue] = useState('');
        const handleChange = (event) => {
            setValue(event.target.value); /*dateFunc(event.target.value);*/
            //console.log(value);
        };
        
        return <input type="text" style = {{"width":"240px", height:"40px", marginTop:"5px"}} onInput = {handleChange}/>;   
    }

    function VerifyAccount() {
        /*
         AUTHENTICATION!
        */
    }

    return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
        <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
            <div className="generalText" style = {{alignSelf:"center", marginTop:"20px"}} >
                {"No account? "} <Link to="/create_new_account"> Sign up</Link>{"!"}
            </div>
            <div className="generalText" style = {{alignSelf:"self-start"}} >{"username/email"}</div>
            <div> <Box /> </div> 
            <div className="generalText" style = {{alignSelf:"self-start"}} >{"password"}</div>
            <div> <Box /> </div>
            <div><Button size="sm" variant="outline-success" onClick={() => VerifyAccount()} style={{marginBottom:"15px"}}>Submit</Button></div>
        </div>
    </div>
    
        
    )
}

export default Login;