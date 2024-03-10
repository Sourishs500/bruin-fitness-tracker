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
    const [image, setImage] = useState(DefaultProfilePic);

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

                if ((user.current).picture == "kirby.png") {
                    setImage(kirby);
                } else if ((user.current).picture == "rowlet.png") {
                    setImage(rowlet);
                } else {
                    setImage(DefaultProfilePic);
                }
                console.log("YAY");
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
            <div className="modal" style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img className="largeProfilePicture" style = {{marginRight:"20px"}} src={kirby}/>
                    <img className="largeProfilePicture" style = {{marginRight:"20px"}} src={kirby}/>
                    <img className="largeProfilePicture" style = {{marginRight:"0px"}} src={kirby}/>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"30px"}}>
                    <img className="largeProfilePicture" style = {{marginRight:"20px"}} src={kirby}/>
                    <img className="largeProfilePicture" style = {{marginRight:"20px"}} src={kirby}/>
                    <img className="largeProfilePicture" style = {{marginRight:"0px"}} src={kirby}/>
                </div>
            </div>
            
        </Popup>
    );

    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop:"20px"}}>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginRight:"20px"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"Your Account"}</div>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"username"}</div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{current_username}</div>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"gender"}</div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{gender}</div>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"password"}</div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{password}</div>
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{"idk profile picture"}</div>
                <img className="largeProfilePicture" style = {{marginTop:"10px"}} src={image}/>
                <div> <Modal/> </div>
            </div>
        </div>
        </div>
    )
}

export default ProfilePage;