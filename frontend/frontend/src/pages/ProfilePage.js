import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import DefaultProfilePic from '../components/profilePics/DefaultProfilePic.png'
import Popup from 'reactjs-popup';


const ProfilePage = ({username, photo, setPhoto}) => {

    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"220px", height:"40px", marginTop:"5px", fontSize:"20px"}}
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    const user = useRef();
    const [current_username, setCurrent_Username] = useState(null);
    const [gender, setGender] = useState(null);
    const [password, setPassword] = useState(null);
    const [photo_show, setPhoto_show] = useState(photo);
    const imageURL_dynamic = useRef(null);
    const photo_src = useRef();
    const [message, setMessage] = useState("");

    async function fetchAccount(name) {
        try {
            const path = '/api/user/getUser/'.concat("", name)
            const response = await fetch(path)
            const json = await response.json()
            if (json.length == 1) { 
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
        if (username != "Not signed in!") {
            const u = await fetchAccount(username, user);
            //console.log("???:", user.current);
            if (user.current) {
                setCurrent_Username((user.current).username);
                setGender((user.current).gender);
                setPassword((user.current).password);
                setPhoto_show((user.current).image);
            } else {
                console.log("HHU?g!");
            }
        } else {
            console.log("Not signed in!");
        }
    }

    const changePicture = async (URL) => {
        let data = {"name":username, "URL":URL};
        const path = '/api/user/updateProfilePhoto'
        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        setPhoto_show(URL);
        setPhoto(URL);
        setMessage("Updated your profile photo!");
    }

    VerifyAccount();

    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop:"20px"}}>
            <div style={{display: "flex", justifyContent: "center", marginRight:"20px"}}> 
                <div style={{"width":"200px", height:"200px", display: "flex", flexDirection: "column"}}>
                    <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"Your Account"}</div>
                    <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"Username"}</div>
                    <div className="accountText" style = {{marginTop:"7px"}} >{current_username}</div>
                    <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"Gender"}</div>
                    <div className="accountText" style = {{marginTop:"7px"}} >{gender}</div>
                    <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"Password"}</div>
                    <div className="accountText" style = {{marginTop:"7px"}} >{password}</div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}> 
                <div style={{"width":"250px", height:"550px", display: "flex", flexDirection: "column"}}>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"Profile Picture"}</div>

                    <img className="largeProfilePicture" style = {{marginTop:"10px", marginBottom:"10px"}} src={photo_show}/>

                    <div className="accountText" >{"Set new profile picture:"}</div>
                    <div> <Box val={imageURL_dynamic}/> </div>  
                    <div> 
                        <Button size="sm" variant="outline-primary" onClick={() => changePicture(imageURL_dynamic.current.value)} 
                        style={{"width": "220px", height:"40px", marginTop:"10px", marginBottom:"10px",
                        fontFamily: "Trebuchet MS", fontSize: "20px"}}>Set my picture!</Button>
                    </div>
                    <div className="generalText" style = {{alignSelf:"self-start"}}> {message}</div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;