import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

const NewAccount = () => {

    function Box(/*{dateFunc}*/)
    {
        const [value, setValue] = useState('');
        const handleChange = (event) => {
            setValue(event.target.value); /*dateFunc(event.target.value);*/
            //console.log(value);
        };
        
        return <input type="text" style = {{"width":"240px", height:"40px", marginTop:"5px"}} onInput = {handleChange}/>;   
    }

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
                <div className="generalText" style = {{alignSelf:"center", marginTop:"20px"}} >
                    {"Have an account? "} <Link to="/login"> Sign in</Link>{"!"}
                </div>
                <div className="generalText" style = {{alignSelf:"self-start"}} >{"email"}</div>
                <div> <Box /> </div> 
                <div className="generalText" style = {{alignSelf:"self-start"}} >{"username"}</div>
                <div> <Box /> </div>
                <div className="generalText" style = {{alignSelf:"self-start"}} >{"password"}</div>
                <div> <Box /> </div>
                <div className="generalText" style = {{alignSelf:"self-start"}} >{"confirm password"}</div>
                <div> <Box /> </div>
            </div>
        </div>
    )
}

export default NewAccount;