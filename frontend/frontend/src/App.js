import { useEffect, useState, useRef } from 'react';

import FullGeneralInfoComponents from './components/generalInfoComponents/fullGeneralInfoComponents.js'; 
import FullHeaderComponents from './components/headerComponents/fullHeaderComponents.js'; 
import FullHistoryComponents from './components/historyComponents/fullHistoryComponents.js'; 
import FullSpecificInfoComponents from './components/specificInfoComponents/fullSpecificInfoComponents.js'; 


export default function App () {

    let allExercisesOrganizedByTheme = {
        "Push":["Chest Press", "Bench Press"],
        "Pull":["Preacher Curls", "Lat Pull-Downs"],
        "Legs":["Wall-Sits", "Calf Raises"]   
    }; //to be un-hardcoded once we figure out the API stuff

    const allThemes = Object.keys(allExercisesOrganizedByTheme); //Push, pull, legs
    const allExercises = Object.values(allExercisesOrganizedByTheme).flat(); //List of all the exercises across all of the themes

    const dataWithoutGeneralComments = useRef([]);
    const generalNotes = useRef("");
    const completeWorkoutData = useRef({});
    const [updatedVersionOfCompleteworkouts, updateCompleteWorkout] = useState({});

    //receives the general notes from FullGeneralInfo and stores it in generalNotes
    function receiveGeneralNotes({notes})   {generalNotes.current = notes["n"];} 
    
    //receives the workout data from FullSpecificInfo and stores it dataWithoutGeneralComments
    function receiveData({data})            {dataWithoutGeneralComments.current = data["n"]; 
                                             completeWorkoutData.current = {"GeneralNotes":generalNotes.current, "Workout":dataWithoutGeneralComments.current};
                                             console.log("Updated: ", completeWorkoutData.current);
                                             updateCompleteWorkout(completeWorkoutData.current);
                                            }

    return (
        <>
        <div style={{ backgroundColor: 'pink' }}><FullHeaderComponents/></div>

		<div style={{ backgroundColor: 'lightgreen' }}><FullGeneralInfoComponents 
                                                        SendValueUp={receiveGeneralNotes}
                                                        exInfo={allExercisesOrganizedByTheme}
                                                        /></div>

		<div style={{ backgroundColor: 'lightyellow' }}><FullSpecificInfoComponents 
                                                         SendValueUp={receiveData} 
                                                         exInfo={allExercises}
                                                         summaryToDisplay={updatedVersionOfCompleteworkouts}
                                                         
                                                         /></div>
        
        <div style={{ backgroundColor: 'lightblue' }}><FullHistoryComponents/></div>
        </>
   );
};