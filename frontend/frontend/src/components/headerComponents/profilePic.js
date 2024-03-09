import kirby from './kirby.png'
//import chest from './chest.png'
//import bicep from './bicep.png'
import {Link} from 'react-router-dom'
import defaultProfilePic from "./DefaultProfilePic.png"
import { useEffect, useState, useRef } from 'react';

async function getGoldStars()
{
    return 400; //replace this statement with the implementation of the backend call required to get the actual value
}

async function getPlatinumStars()
{
    return 200; //replace this statement with the implementation of the backend call required to get the actual value
}


export default function ProfilePic({username})
{
    const [goldStarCount, updateGoldStarCount] = useState(100)
    const [platinumStarCount, updatePlatStarCount] = useState(100)

    const golds = async () => updateGoldStarCount(await getGoldStars());
    const plats = async () => updatePlatStarCount(await getPlatinumStars());
    golds();
    plats();
    const userLoggedIn = true;
    //const [userLoggedIn, updateUserLoggedIn] = useState(true);
    
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
                        <img className="profilePicture" src={kirby}/>
                    </Link>
                </span>);
    }
    else
    {
        //
        //<div style={{border:"1px solid black", height:"70px", width:"70px", marginLeft:"20px", marginRight:"20px"}}></div>
        return (<span className="topBarRight">
                    <img className="profilePicture" src={defaultProfilePic}/>
                </span>
        );
    }
}