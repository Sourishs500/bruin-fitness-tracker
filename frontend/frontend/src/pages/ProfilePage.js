import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import kirby from '../components/profilePics/kirby.png'
import DefaultProfilePic from '../components/profilePics/DefaultProfilePic.png'
import rowlet from '../components/profilePics/rowlet.png'
import Popup from 'reactjs-popup';


const ProfilePage = ({username}) => {

    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"240px", height:"40px", marginTop:"5px", fontSize:"20px"}}
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    const user = useRef();
    // const current_username = useRef();
    // const gender = useRef();
    // const password = useRef();
    const [current_username, setCurrent_Username] = useState(null);
    const [gender, setGender] = useState(null);
    const [password, setPassword] = useState(null);
    const [photo, setPhoto] = useState(null);
    const imageURL_dynamic = useRef();
    const photo_src = useRef();

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

    async function changePicture(name, URL) {
        let data = {"name":name, "URL":URL};
        const path = '/api/user/updateProfilePhoto'
        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        
        console.log("UHHH!", json);
    }

    const VerifyAccount = async () => {
        if (username != "Not signed in!") {
            const u = await fetchAccount(username, user);
            console.log("???:", user.current);
            if (user.current) {
                setCurrent_Username((user.current).username);
                setGender((user.current).gender);
                setPassword((user.current).password);
                photo_src.current = (user.current).image;
                setPhoto((user.current).image);

                if ((photo_src.current).includes(".jpg") || (photo_src.current).includes(".jpeg") || (photo_src.current).includes(".png")) {
                    photo_src.current = photo_src.current;
                }
                else {
                    photo_src.current = DefaultProfilePic;
                }
                setPhoto(photo_src.current);
            }
            else {
                console.log("HHU?g!");
            }
        }
        else {
            console.log("Not signed in!");
        }
    }

    const handleImageButton = async () => {
        const u = await changePicture(username, imageURL_dynamic.current.value);
        //VerifyAccount();
        //setPhoto()
    }

    VerifyAccount();
    

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
                {/* {imageURL && (
                    <img className="showProfilePic"
                        src={imageURL}
                    />
                )} */}
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
                    <img className="largeProfilePicture" style = {{marginTop:"10px"}} src={photo_src.current}/>
                    <div> <Modal/> </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;