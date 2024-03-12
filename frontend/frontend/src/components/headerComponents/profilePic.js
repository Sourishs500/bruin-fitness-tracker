import DefaultProfilePic from '../profilePics/DefaultProfilePic.png'
//import chest from './chest.png'
//import bicep from './bicep.png'
import {Link} from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';

async function getGoldStars() 
{
    const [name, updateName] = useState("lara2")
    const [userInfo, updateUserInfo] = useState({});
    //return 400; //replace this statement with the implementation of the backend call required to get the actual value
    const fetchAccount = async (myName) => {
        const path = '/api/user/getUser/'.concat("", myName)
        const response = await fetch(path)
        const json = await response.json()
        if (json.length == 1) { 
            updateUserInfo(json); 
        } 
        else {
            console.log("Username doesn't exist.");
        }
    }
    const u = await fetchAccount(name);
    return userInfo[0].gold_stars;

}

async function getPlatinumStars()
{
    return 200; //replace this statement with the implementation of the backend call required to get the actual value
}

export default function ProfilePic({username, photo})
{
    const [goldStarCount, updateGoldStarCount] = useState(100)
    const [platinumStarCount, updatePlatStarCount] = useState(100)

    const golds = async () => updateGoldStarCount(await getGoldStars());
    const plats = async () => updatePlatStarCount(await getPlatinumStars());
    golds();
    plats();
    
    //console.log("FROM PROFILEPIC.JS:", photo);
    
    if (username != "")
    {
        return (<span className="topBarRight">
                    <div style={{display: "flex", flexDirection: "column", alignItems: "end", marginLeft:"25px"}}>
                        <div className="usernameText">
                            Gold Stars: {goldStarCount}
                        </div>
    
                        <div className="usernameText">
                            Platinum Stars: {platinumStarCount}
                        </div>
                    </div>
                    <Link to="/profile_page" style = {{color: '#0000cc'}}> 
                        <img className="profilePicture" src={photo}/>
                    </Link>
                </span>);
    }
    else {
        return (<span className="topBarRight">
                    <img className="profilePicture" src={DefaultProfilePic}/>
                </span>
        );
    }
}