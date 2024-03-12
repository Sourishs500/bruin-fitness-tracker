import { useEffect, useState, useRef } from 'react';

import GeneralInfo from './generalInfo.js';
import MusclesWorkedOut from './musclesWorkedOut.js';
import SummaryBox from '../specificInfoComponents/summaryBox.js'
import UserDataEntries from '../specificInfoComponents/userDataEntries.js';

export default function FullGeneralInfoComponents({SendValueUpGen, SendDateUpGen, exInfoGen, muscleGroupsToDisplay, SendValueUpSpec, summaryToDisplay, exInfoSpec})
{
    const generalNotes = useRef("");
    function updateNotes({newNotes})
    {
        generalNotes.current = newNotes["n"];
        const n = generalNotes.current;
        SendValueUpGen({notes:{n}});
        //console.log("General Notes: ", generalNotes.current)
    }

    const dateNotes = useRef("");
    function updateDate({newNotes})
    {
        dateNotes.current = newNotes["n"];
        const n = dateNotes.current;
        SendDateUpGen({date:{n}});
    }

    const dataForWorkout_layer2 = useRef([]);
    function receiveDataSpec({data})
    {
        dataForWorkout_layer2.current = data["n"];
        const n = dataForWorkout_layer2.current;
        SendValueUpSpec({data:{n}});
    }

    return (
        <div style = {{display:"flex", justifyContent:"space-evenly", flexDirection:"column"}}>
            <GeneralInfo SendValueUp={updateNotes} SendDateUp = {updateDate} exInfo={exInfoGen}/>              
            
            <div style={{display:"flex", justifyContent:"flex-right", flexDirection:"row"}}> 
                <UserDataEntries SendValueUp={receiveDataSpec} allExercises={exInfoSpec}/>      
                <div style={{marginLeft:"auto", marginTop:20}}> <MusclesWorkedOut givenExercises={muscleGroupsToDisplay}/> </div>
            </div>
            <div> <SummaryBox toShow={summaryToDisplay}/></div>
            
        </div>
    );
};