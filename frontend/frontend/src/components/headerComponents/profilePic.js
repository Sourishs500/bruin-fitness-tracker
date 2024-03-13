import DefaultProfilePic from '../profilePics/DefaultProfilePic.png'
//import chest from './chest.png'
//import bicep from './bicep.png'
import {Link} from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import GetGoldStars from './goldstar';
import GetPlatinumStars from './platinumstar';

export default function ProfilePic({username, photo, goldStarCount, platStarCount})
{
    
    //console.log("FROM PROFILEPIC.JS:", photo);

    // const [photo_src, setPhoto_src] = useState();
    // if (photo.includes(".jpg") || photo.includes(".jpeg") || photo.includes(".png")) {
    //     setPhoto_src(photo);
    // }
    // else {
    //     setPhoto_src(DefaultProfilePic);
    // }
    console.log("PFP")
    console.log(goldStarCount)
    console.log(platStarCount)
    if (username != "")
    {
        return (<span className="topBarRight">
                    <div style={{display: "flex", flexDirection: "column", alignItems: "end", marginLeft:"25px", color: '#ffd700'}}>
                        <div className="usernameText">
                            Gold Stars: {goldStarCount}
                        </div>
    
                        <div className="usernameText">
                            Platinum Stars: {platStarCount}
                        </div>
                    </div>
                    <Link to="/profile_page" style = {{color: '#0000cc'}}> 
                        <img className="profilePicture" src={photo} alt = ""/>
                    </Link>
                </span>);
    }
    else {
        return (<span className="topBarRight">
                    <img className="profilePicture" src={DefaultProfilePic} alt = ""/>
                </span>
        );
    }
}