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
        
            <div style={{display:"flex", justifyContent:"space-between", flexDirection:"row", marginTop:"20px", marginBottom:"20px", flexGrow:"1"}}> 
                <div style={{display:"flex", flexGrow:"1", backgroundColor: 'lightblue', padding:15, borderRadius:15, background: "linear-gradient(110deg, #f0f6ff, #e8f2ff)", minWidth:"65%", marginRight:"20px"}}>
                    <UserDataEntries SendValueUp={receiveDataSpec} allExercises={exInfoSpec}/>  
                </div>
                <div style={{display:"flex", justifyContent:"center", flexGrow:"1", backgroundColor: 'lightblue', padding:15, borderRadius:15, background: "linear-gradient(110deg, #f0f6ff, #e8f2ff)"}}>
                    <div style={{marginTop:"5px"}}> <MusclesWorkedOut givenExercises={muscleGroupsToDisplay}/> </div>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", backgroundColor: 'lightblue', padding:15, borderRadius:15, background: "linear-gradient(110deg, #f0f6ff, #e8f2ff)"}}>
                <div style={{marginBottom:"10px"}} className="generalText"> <b>Workout Summary</b> </div>
                <div > <SummaryBox toShow={summaryToDisplay}/></div>
            </div>
        </div>
    );
};