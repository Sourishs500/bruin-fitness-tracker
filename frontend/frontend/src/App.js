import { useEffect, useState, useRef } from 'react';

import FullGeneralInfoComponents from './components/generalInfoComponents/fullGeneralInfoComponents.js'; 
import FullHeaderComponents from './components/headerComponents/fullHeaderComponents.js'; 
import FullHistoryComponents from './components/historyComponents/fullHistoryComponents.js'; 
import FullSpecificInfoComponents from './components/specificInfoComponents/fullSpecificInfoComponents.js'; 

export default function App () {

    const dataWithoutGeneralComments = useRef([]);
    const generalNotes = useRef("");
    const completeWorkoutData = useRef({});
    function receiveGeneralNotes({notes})   {generalNotes.current = notes["n"];}
    function receiveData({data})            {dataWithoutGeneralComments.current = data["n"]; 
                                             console.log("Data submitted:");
                                             console.log("Data: ", dataWithoutGeneralComments.current, " | Notes: ", generalNotes.current);
                                             completeWorkoutData.current = {"GeneralNotes":generalNotes.current, "Workout":dataWithoutGeneralComments.current}}

    return (
        <>
        <div style={{ backgroundColor: 'pink' }}><FullHeaderComponents/></div>
		<div style={{ backgroundColor: 'lightgreen' }}><FullGeneralInfoComponents SendValueUp={receiveGeneralNotes}/></div>
		<div style={{ backgroundColor: 'lightyellow' }}><FullSpecificInfoComponents SendValueUp={receiveData}/></div>
        <div style={{ backgroundColor: 'lightblue' }}><FullHistoryComponents/></div>
        </>
   );
};