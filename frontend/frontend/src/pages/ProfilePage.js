import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import kirby from '../components/profilePics/kirby.png'
import DefaultProfilePic from '../components/profilePics/DefaultProfilePic.png'
import rowlet from '../components/profilePics/rowlet.png'
import Popup from 'reactjs-popup';


const ProfilePage = ({username}) => {

    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"240px", height:"40px", marginTop:"5px"}}
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    const user = useRef();
    // const current_username = useRef();
    // const gender = useRef();
    // const password = useRef();
    const [current_username, setCurrent_Username] = useState("Not signed in!");
    const [gender, setGender] = useState("Not signed in!");
    const [password, setPassword] = useState("Not signed in!");
    const [photo, setPhoto] = useState("Not signed in!");

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
                console.log("USER.CURRENT.USERNAME:",(user.current).username);
                setCurrent_Username((user.current).username);
                console.log("current_username:", current_username);
                setGender((user.current).gender);
                setPassword((user.current).password);
                setPhoto((user.current).image);
            }
            else {
                console.log("HHU?g!");
            }
        }
        else {
            console.log("Not signed in!");
        }
    }

    VerifyAccount();

    const updateDoc = {
        $set: {
          plot: `A harvest of random numbers, such as: ${Math.random()}`
        },
    };

    const imageURL_dynamic = useRef();
    const [imageURL, setImageURL] = useState(photo);
    function handleImageButton() {
        if (imageURL_dynamic.current.value) {
            setImageURL(imageURL_dynamic.current.value);
        }
    }

    const vale = useRef();
    const Modal = () => (
        <Popup 
            trigger={<Button size="sm" variant="outline-primary" 
            style={{"width": "200px", height:"40px", marginTop:"20px",
            fontFamily: "Trebuchet MS", fontSize: "18px"}}>Change Profile Picture</Button>}
            position="right center"
            modal
            nested
            >
            <div className="modal"style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} >
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
            </div>
        </Popup>
    );

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
                <div style={{"width":"200px", height:"400px", display: "flex", flexDirection: "column"}}>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"Profile Picture"}</div>
                    <img className="largeProfilePicture" style = {{marginTop:"10px"}} src={photo}/>
                    <div> <Modal/> </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;