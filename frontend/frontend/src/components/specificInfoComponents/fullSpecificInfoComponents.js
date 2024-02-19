import { useEffect, useState, useRef } from 'react';

import SummaryBox from './summaryBox.js';
import UserDataEntries from './userDataEntries.js';

export default function FullSpecificInfoComponents({SendValueUp})
{
    const dataForWorkout_layer2 = useRef([]);
    function receiveData({data})
    {
        dataForWorkout_layer2.current = data["n"];
        const n = dataForWorkout_layer2.current;
        console.log("Data received one layer up")
        SendValueUp({data:{n}});
    }

    return (
        <div style={{display:"flex", alignItems:"flex-start"}}> 
            <span style={{marginRight:"50px", marginBottom:"20px", marginLeft:"20px", marginTop:"20px"}}> <SummaryBox/> </span>
            <div><UserDataEntries SendValueUp={receiveData}/></div>
        </div>
    );
}