import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import {Buffer} from "buffer";
import DefaultProfilePic from '../components/profilePics/DefaultProfilePic.png'

const NewAccount = ({username}) => {
    const new_username = useRef();
    const gender = useRef();
    const password = useRef();
    const password2 = useRef();
    const imageURL_dynamic = useRef();
    const [imageURL, setImageURL] = useState("https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp");
    const genderOptions = ["female", "male", "nonbinary", "prefer not to say"];
    const genderCount = [...Array(genderOptions.length).keys()];
    const completeUser = useRef({});
    const [message, setMessage] = useState("");
    const [message2, setMessage2] = useState("");
    

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
        completeUser.current = {"username":new_username.current.value, "password":password.current.value, "gender":gender.current.value, "image":imageURL};
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
        console.log(imageURL);
        if (username) {
            setMessage("Already signed in, no need to create an account.");
        } else if (!new_username.current.value) {
            setMessage("Please input a username.");
        } else if (await usernameExists(new_username.current.value)) {
            setMessage("Username already taken. Please choose a different one.");
        } else if (password.current.value != password2.current.value) {
            setMessage("Passwords must match.");
        }
        else { handleCreateAccount(); }
        
    }

    function handleImageButton() {
        if (imageURL_dynamic.current.value) {
            let URL = imageURL_dynamic.current.value;
            if (URL.includes("png") || URL.includes("jpg") || URL.includes("jpeg") || URL.includes("http")) {
                setImageURL(imageURL_dynamic.current.value);
                setMessage2("Profile photo updated!");
            }
            else {
                setMessage2("Invalid profile photo URL. Profile photo not updated");
            }   
        }
    }


    
    return (
        <>
        <div style={{display: "flex", justifyContent: "center", flexDirection: "row"}}> 
            <div className="accountText" style = {{marginTop:"20px", display: "flex", justifyContent: "center"}} >
                {"Have an account? "}
            </div>
            <div className="generalText" style = {{marginTop:"20px", display: "flex", justifyContent: "center"}} >
                <Link to="/login" style = {{color: '#0000cc', marginLeft:"5px"}}> {"Sign in"} </Link>{"!"}
            </div>
        </div>
        <div style={{marginTop:"10px", display: "flex", justifyContent: "center", flexDirection: "row"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column", marginRight:"35px"}}>
                <div className="accountText" >{"username"}</div>
                <div> <Box val={new_username}/> </div>
                <div className="accountText" >{"gender"}</div>
                <div> 
                    <select ref={gender} style={{"width":"240px", height:"40px", marginTop:"10px"}}
                        onClick={(e)=>{gender.current.value = e.target.value}}>  
                        {genderCount.map(gen => <option key={gen} value={genderOptions[gen]}> {genderOptions[gen]} </option>)} 
                    </select> 
                </div>
                <div className="accountText" >{"password"}</div>
                <div> <Box val={password}/> </div>
                <div className="accountText" >{"confirm password"}</div>
                <div> <Box val={password2}/> </div>
                <div>
                    <Button size="sm" variant="outline-primary" onClick={() => handleButton()} 
                    style={{"width": "120px", height:"40px", marginTop:"20px",
                    fontFamily: "Trebuchet MS", fontSize: "20px"}}> Submit</Button>
                </div>
                <div className="accountText" >{message}</div>
            </div>
            <div style={{width:"250px"}}>
                <div className="accountText" >{"image URL"}</div>
                <div> <Box val={imageURL_dynamic}/> </div>  
                <div> 
                    <Button size="sm" variant="outline-primary" onClick={() => handleImageButton()} 
                    style={{"width": "240px", height:"40px", marginTop:"20px", marginBottom:"20px",
                    fontFamily: "Trebuchet MS", fontSize: "20px"}}>Set my picture!</Button>
                </div>         
                {imageURL && (
                    <img className="showProfilePic"
                        src={imageURL}
                    />
                )}
                <div className="accountText" >{message2}</div>
            </div>
        </div>
        </>
    )
}

export default NewAccount;