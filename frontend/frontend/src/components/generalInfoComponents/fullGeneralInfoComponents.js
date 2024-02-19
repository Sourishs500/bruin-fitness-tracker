import { useEffect, useState, useRef } from 'react';

import GeneralInfo from './generalInfo.js';
import Directions from './directions.js';
import MusclesWorkedOut from './musclesWorkedOut.js';


//To-do: Actually implementing something for musclesWorkedOut.js

export default function FullGeneralInfoComponents({SendValueUp, exInfo})
{
    const generalNotes = useRef("");
    function updateNotes({newNotes})
    {
        generalNotes.current = newNotes["n"];
        const n = generalNotes.current;
        SendValueUp({notes:{n}});
        //console.log("General Notes: ", generalNotes.current)
    }

    return (
        <div style={{display:"flex", alignItems:"flex-start"}}>
            <div style={{marginBottom:"20px", marginLeft:"20px", marginTop:"20px"}}> <MusclesWorkedOut/> </div>
            <div style={{marginLeft:"50px"}}>
                <div> <Directions/>  </div>
                <div> <GeneralInfo SendValueUp={updateNotes} exInfo={exInfo}/> </div>
            </div>
        </div>
    );
};