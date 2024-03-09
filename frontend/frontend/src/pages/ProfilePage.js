import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import kirby from '../components/headerComponents/kirby.png'

const ProfilePage = ({username}) => {
    
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    function Box({val}) {
        return <input type="text" ref={val} style = {{"width":"240px", height:"40px", marginTop:"5px"}}
        onChange={(e) => ((val).current.value = e.target.value)}/>;   
    }

    const um = useRef();
    const user = useRef();
    const current_username = useRef();
    const gender = useRef();
    const password = useRef();

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
    if (username) {
        //console.log("fetching...");
        fetchAccount(username);
        //console.log(user.current[0]);
        current_username.current = (user.current)[0].username;
        gender.current = (user.current)[0].gender;
        password.current = (user.current)[0].password;
    }
    else {
        console.log("GUH");
    }
    
    //(user.current)[0].password;
 
    // return (
    //     <div>
    //         <div className="generalText"> Add Image:</div>
    //         <input type="file" onChange={handleChange} />
    //         <img style={{width: "200px", height: "200px", objectFit: "scale-down"}} src={file} />
    //     </div>
    // );

    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop:"20px"}}>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginRight:"20px"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"Your Account"}</div>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"username"}</div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{current_username.current}</div>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"gender"}</div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{gender.current}</div>
                <div className="biggerText" style = {{alignSelf:"self-start", marginTop:"10px"}} >{"password"}</div>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{password.current}</div>
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
            <div style={{"width":"250px", height:"200px", display: "flex", flexDirection: "column"}}>
                <div className="generalText" style = {{alignSelf:"self-start", marginTop:"7px"}} >{"idk profile picture"}</div>
                <img className="largeProfilePicture" style = {{marginTop:"10px"}} src={kirby}/>
            </div>
        </div>
        </div>
    )
}

export default ProfilePage;