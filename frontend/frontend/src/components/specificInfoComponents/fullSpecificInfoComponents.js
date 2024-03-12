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
        <div style={{display:"flex", justifyContent:"flex-start"}}> 
            <div style={{flexGrow:3}}><UserDataEntries SendValueUp={receiveData} allExercises={exInfo}/></div>
            <span style={{marginLeft:"auto"}}> 
                <SummaryBox toShow={summaryToDisplay}/>
            </span>
        </div>
    );
}