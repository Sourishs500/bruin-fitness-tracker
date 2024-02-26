import { useEffect, useState, useRef } from 'react';

import GeneralInfo from './generalInfo.js';
import Directions from './directions.js';
import MusclesWorkedOut from './musclesWorkedOut.js';


export default function FullGeneralInfoComponents({SendValueUp, SendDateUp, exInfo, muscleGroupsToDisplay})
{
    const generalNotes = useRef("");
    function updateNotes({newNotes})
    {
        generalNotes.current = newNotes["n"];
        const n = generalNotes.current;
        SendValueUp({notes:{n}});
        //console.log("General Notes: ", generalNotes.current)
    }

    const dateNotes = useRef("");
    function updateDate({newNotes})
    {
        dateNotes.current = newNotes["n"];
        const n = dateNotes.current;
        SendDateUp({date:{n}});
    }

    return (
        <div style={{display:"flex", alignItems:"flex-start"}}>
            <div style={{marginBottom:"20px", marginLeft:"20px", marginTop:"20px"}}> <MusclesWorkedOut givenExercises={muscleGroupsToDisplay}/> </div>
            <div style={{marginLeft:"50px"}}>
                <div> <Directions/>  </div>
                <div> <GeneralInfo SendValueUp={updateNotes} SendDateUp = {updateDate} exInfo={exInfo}/> </div>
            </div>
        </div>
    );
};