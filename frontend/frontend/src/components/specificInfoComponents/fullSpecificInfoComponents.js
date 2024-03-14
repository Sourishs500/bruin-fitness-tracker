import { useEffect, useState, useRef } from 'react';

import SummaryBox from './summaryBox.js';
import UserDataEntries from './userDataEntries.js';


export default function FullSpecificInfoComponents({SendValueUpSpec, summaryToDisplay, exInfoSpec})
{
    const dataForWorkout_layer2 = useRef([]);
    function receiveDataSpec({data})
    {
        dataForWorkout_layer2.current = data["n"];
        const n = dataForWorkout_layer2.current;
        SendValueUpSpec({data:{n}});
    }

    return (
        <div style={{display:"flex", justifyContent:"flex-start"}}> 
            <div style={{flexGrow:3}}><UserDataEntries SendValueUp={receiveDataSpec} allExercises={exInfoSpec}/></div>
            <span style={{marginLeft:"auto"}}> 
                <SummaryBox toShow={summaryToDisplay}/>
            </span>
        </div>
    );
}