/*
Remaining Tasks
1) Stop hard-coding the allExercises variable
2) Implement getAllSetsForExercisesSubmitted
*/

import { useEffect, useState, useRef } from 'react';

function CreateTextBox({SendValueUp}) //pass in the text update function here
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
        const n = event.target.value;
        SendValueUp({val:{n}});
    };
    return <textarea type="text" value={value} onChange={handleChange} placeholder="" style={{"width":"200px", "height":"25px", marginRight:"20px", overflowY:"scroll"}}/>;
};

function CreateSetBox({setNum, exLabel, SendValueUp} ) //pass in the text update function here
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
        const n=event.target.value;
        SendValueUp({val:{n}, i:{setNum}});
    };
    return <input type="text" label = {setNum} name = {exLabel} style = {{"width":"75px", height:"10px"}} onInput = {handleChange}/>;   
}

export default function UserDataEntries ({SendValueUp}) //List of exercise rows, along with three buttons at the end (add exercise, remove exercise, and submit)
/*
functions defined: 
    ExerciseRow, RemoveExercise, AddExercise, specialRemoveExercise, getAllSetsForExercisesSubmitted
variables used: 
    allExercises (currently hard-coded but should be retrieved from an API), totalExerciseCount, exerciseList (list of ExerciseRow components)
*/

{
    const allExercises = ["Chest Press", "Preacher Curls", "Wall-Sits", "Bench Press", "Lat Pull-Downs", "Calf Raises"]

    function ExerciseRow({exList, removal, Key, SendValueUp}) //pas6s in the text update here for the exercise and the sets

    //One text box for notes, n text boxes for n sets, two buttons (add set, remove set)
    /*
        functions defined:
            incSets, decSets
        variables used:
            sets (list of CreateSetBox components)
    */
    {
        const setCounter = useRef(0); //Initializes the number of sets to zero

        //pass the information between this line
        const allSets = useRef([]); //Keeps track of the text in each textbox for each of the sets (initializes it to an empty list
        const specificNotesText = useRef(""); //Initializes the initial note to an empty string
        const selectedExerciseForRow = useRef(allExercises[0]); //Initializes  exercise selection to 1st exercise in list (default on the display)
        //and this line upward to the higher component

        const [sets, updateSets] = useState([]); //react elements for the textboxes about the sets)

        function displayExerciseRow({displayable})
        {
            const rowInfoToSend = { 
                                    "Exercise":selectedExerciseForRow.current,
                                    "Notes":specificNotesText.current,
                                    "SetInformation":allSets.current
                                  };
            const n = rowInfoToSend;
            const workoutNum = Key;
            SendValueUp({val:{n}, i:{workoutNum}});
            if (displayable!==false) console.log(rowInfoToSend, "Number of sets: ", setCounter.current);
        }

        function TrackEx(event) {selectedExerciseForRow.current = event.target.value; displayExerciseRow({displayable:true});} //updates the exercise selection
        function TrackSets({val, i}) {allSets.current.splice(i["setNum"], 1, val["n"]); displayExerciseRow({displayable:false});} //updates the list of set information
        function TrackSpecificNotes({val}) {specificNotesText.current = val["n"]; displayExerciseRow({displayable:false});} //updates the note for the exercise
        
        function incSets() {
            updateSets([...sets, <CreateSetBox SendValueUp = {TrackSets} setNum={setCounter.current} />]);
            setCounter.current = setCounter.current + 1;
            allSets.current = [...allSets.current, ""];
            displayExerciseRow({displayable:true});
        }

        function decSets() {
            updateSets(sets.slice(0, Math.max(sets.length-1, 1)));
            if (setCounter.current > 1) allSets.current = allSets.current.slice(0, -1);
            setCounter.current = Math.max(setCounter.current - 1, 1);
            displayExerciseRow({displayable:true});
        }

        return(
            <div key={Key} style={{display:"flex"}}>
                <CreateTextBox key={"specificNotes"} SendValueUp={TrackSpecificNotes}/>
                <select onChange={TrackEx} style={{marginRight:"10px"} }>{exList.map(category => <option value={category}>{category}</option>)}</select> 
                <div>{sets}</div>
                <button onClick={incSets} style={{marginLeft:"10px", marginRight:"10px"}}>Add Set</button>
                <button onClick={decSets} style={{marginLeft:"10px", marginRight:"10px"}}>Remove Set</button>

            </div>
        );
    };

    const exCount = useRef(1);
    const dataForWorkout = useRef([{}]);

    function TrackWorkout({val, i}) 
    {
        dataForWorkout.current.splice(i["workoutNum"], 1, val["n"]);
    } //updates the workout array

    const [exerciseList, changeExerciseList] = useState([<ExerciseRow 
        key={exCount.current} 
        exList={allExercises} 
        removal={() => {}}
        SendValueUp={TrackWorkout}
    />]);

    function AddExercise(index){
        changeExerciseList([...exerciseList, <ExerciseRow 
            Key={exCount.current} 
            exList={allExercises} 
            removal={() => {}}
            SendValueUp={TrackWorkout}
        />])

        exCount.current = exCount.current+1;
        dataForWorkout.current = [...dataForWorkout.current, {}];
    };

    function specialRemoveExercise()
    {
        changeExerciseList(exerciseList.slice(0, -1));
        exCount.current = Math.max(exCount.current-1, 0);
        dataForWorkout.current = dataForWorkout.current.slice(0, -1);
    }

    function getAllSetsForExercisesSubmitted () {
        const n = dataForWorkout.current;
        SendValueUp({data:{n}});
    }; //should eventually implement the functionality of the submit button

    const [setInfo, obtainSetInfo] = useState([]);

    return (
        <div style={{marginTop:"20px"}}>
            <div style={{marginBottom:"15px"}}> {exerciseList} </div>
            <div><button onClick={() => AddExercise(exCount.current)} style={{marginBottom:"15px"}}>Add Exercise</button></div>
            <div><button onClick={() => specialRemoveExercise()} style={{marginBottom:"15px"}}>Remove Final Exercise</button></div>
            <div><button onClick={() => getAllSetsForExercisesSubmitted()} style={{marginBottom:"15px"}}>Submit Workout</button></div>
        </div>
    );
}

//