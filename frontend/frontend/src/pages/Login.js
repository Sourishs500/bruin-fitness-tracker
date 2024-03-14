import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

const Login = ({username, setUsername, setPhoto, setGoldStar, setPlatStar}) => {
    const new_username = useRef();
    const password = useRef();
    const user = useRef();
    const [message, setMessage] = useState("");

    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"240px", height:"40px", marginTop:"5px"}} 
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    const fetchAccount = async (name) => {
        const path = '/api/user/getUser/'.concat("", name)
        const response = await fetch(path)
        const json = await response.json()
        if (json.length == 1) { 
            user.current = json; 
        } 
        else {
            user.current = [];
            console.log("Username doesn't exist.");
        }
    }
    
    const VerifyAccount = async () => {
        //console.log(username);
        if (username) {
            setMessage("You are already signed in.");
            return;
        }
        const u = await fetchAccount(new_username.current.value);
        if ((user.current).length == 1) {
            if ((user.current)[0].password != password.current.value) {
                setMessage("Failed to log in! Password incorrect.");
            }
            else {
                setUsername(new_username.current.value);
                setPhoto((user.current)[0].image);
                updateStars();
                console.log((user.current)[0].image);
                console.log("hooray!");
                const s = "Successfully logged in. Welcome " + new_username.current.value + "!";
                setMessage(s);
            }
        }
        else {
            setMessage("Failed to log in! Username incorrect.");
        }
    }

    const updateStars = async () => {
        const path = '/api/user/getStars/'.concat(new_username.current.value)

        const response = await fetch(path)


        const json = await response.json();


        if(!response.ok){
            console.log(json.error)
        }else{
            console.log('updatedStars')
            console.log(json)
            setGoldStar(json[0]["gold_stars"])
            setPlatStar(json[0]["platinum_stars"])
        }
       
    }




    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
        <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
            <div className="generalText" style = {{alignSelf:"center", marginTop:"20px"}} >
                {"No account? "} <Link to="/create_new_account" style = {{color: '#0000cc'}} > Sign up</Link>{"!"}
            </div>
            <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"username"}</div>
            <div> <Box val={new_username}/> </div> 
            <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"password"}</div>
            <div> <Box val={password}/> </div>
            <div> <Button size="sm" variant="outline-primary" onClick={() => VerifyAccount()} 
                style={{"width": "120px", height:"40px", marginTop:"20px",
                fontFamily: "Trebuchet MS", fontSize: "20px"}}> Submit</Button>
            </div>
            <div className="generalText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{message}</div>
        </div>
        </div> 
    )
}

export default Login;