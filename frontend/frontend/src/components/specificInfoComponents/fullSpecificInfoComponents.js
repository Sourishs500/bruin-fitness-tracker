import { useEffect, useState, useRef } from 'react';

import SummaryBox from './summaryBox.js';
import UserDataEntries from './userDataEntries.js';

//To-do: Actually implementing statistical analysis

export default function FullSpecificInfoComponents({SendValueUp, summaryToDisplay, exInfo})
{
    const dataForWorkout_layer2 = useRef([]);
    function receiveData({data})
    {
        dataForWorkout_layer2.current = data["n"];
        const n = dataForWorkout_layer2.current;
        SendValueUp({data:{n}});
    }

    return (
        <div style={{display:"flex", alignItems:"flex-start"}}> 
            <span style={{marginRight:"50px", marginBottom:"20px", marginLeft:"20px", marginTop:"20px"}}> 
                <SummaryBox toShow={summaryToDisplay}/> 
            </span>

            <div><UserDataEntries SendValueUp={receiveData} allExercises={exInfo}/></div>
        </div>
    );
}