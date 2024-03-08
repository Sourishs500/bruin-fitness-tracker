import kirby from './kirby.png'
<<<<<<< HEAD
import defaultProfilePic from "./GrayBox.png"
import { useEffect, useState, useRef } from 'react';


async function getGoldStars()
{
    return 400; //replace this statement with the implementation of the backend call required to get the actual value
}

async function getPlatinumStars()
{
    return 200; //replace this statement with the implementation of the backend call required to get the actual value
}


import chest from './chest.png'
import bicep from './bicep.png'


export default function ProfilePic()
{
    const [goldStarCount, updateGoldStarCount] = useState(100)
    const [platinumStarCount, updatePlatStarCount] = useState(100)

    const golds = async () => updateGoldStarCount(await getGoldStars());
    const plats = async () => updatePlatStarCount(await getPlatinumStars());
    golds();
    plats();
    const userLoggedIn = false;
    //const [userLoggedIn, updateUserLoggedIn] = useState(true);
    
    if (userLoggedIn)
    {
        return (<span className="topBarRight">
                    <div style={{display: "flex", flexDirection: "column", alignItems: "end", marginLeft:"25px"}}>
                        <div style={{marginTop:"5px", fontSize:"20px", fontFamily:"serif"}}>
                            Gold Stars: {goldStarCount}
                        </div>
    
                        <div style={{marginTop:"5px", fontSize:"20px", fontFamily:"serif"}}>
                            Platinum Stars: {platinumStarCount}
                        </div>
                    </div>
                    <img className="profilePicture" src={kirby}/>
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