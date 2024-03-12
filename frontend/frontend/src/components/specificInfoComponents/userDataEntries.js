/*
Remaining Tasks
1) Stop hard-coding the allExercises variable
2) Implement getAllSetsForExercisesSubmitted
*/

import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';

function CreateTextBox({SendValueUp}) //pass in the text update function here
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
        const n = event.target.value;
        SendValueUp({val:{n}});
    };
    return <textarea type="text" value={value} onChange={handleChange} placeholder="Exercise Notes" style={{ marginRight:"20px", rows: 5, width:200, resize: "none", overflow:"visible"}}/>
};

function CreateSetBox({setNum, exLabel, SendValueUp} ) //pass in the text update function here
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
        const n=event.target.value;
        SendValueUp({val:{n}, i:{setNum}});
    };
    return <div style = {{padding:2.5}}><input type="text" placeholder="Set Info" label = {setNum} name = {exLabel} style = {{"width":"100px", height:"30px"}} onInput = {handleChange}/></div>;   
}

export default function UserDataEntries ({SendValueUp, allExercises}) //List of exercise rows, along with three buttons at the end (add exercise, remove exercise, and submit)
/*
functions defined: 
    ExerciseRow, RemoveExercise, AddExercise, specialRemoveExercise, getAllSetsForExercisesSubmitted
variables used: 
    allExercises (currently hard-coded but should be retrieved from an API), totalExerciseCount, exerciseList (list of ExerciseRow components)
*/

{
    //const allExercises = ["Chest Press", "Preacher Curls", "Wall-Sits", "Bench Press", "Lat Pull-Downs", "Calf Raises"];

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
            
            updateSets([...sets, <CreateSetBox key={setCounter.current} SendValueUp = {TrackSets} setNum={setCounter.current} />]);
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
            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
                    <div><select onChange={TrackEx} style={{marginBottom:5, width:200}}>{exList.map(category => <option key={category} value={category}>{category}</option>)}</select></div>
                    <div><CreateTextBox key={"specificNotes"} SendValueUp={TrackSpecificNotes} style = {{}}/></div>
                </div>
                <div style = {{marginBottom:"auto", marginTop: "auto", display:"flex", flexFlow: "row wrap"}}>{sets}</div>
                <div style = {{marginLeft:"auto"}}>
                    <div style = {{marginBottom:2.5, marginLeft: "auto", marginTop:2.5}}><Button size="sm" variant="success" onClick={incSets} style={{marginLeft:"10px", marginRight:"10px", minHeight:30, minWidth: 95}}>Add Set</Button></div>
                    <div style = {{marginBottom:2.5, marginLeft: "auto", marginTop:2.5}}><Button size="sm" variant="danger" onClick={decSets} style={{marginLeft:"10px", marginRight:"10px",  minHeight:30, minWidth: 95}}>Remove Set</Button></div>
                </div>
                

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
        Key={0}
        key={Math.random()}
        exList={allExercises} 
        removal={() => {}}
        SendValueUp={TrackWorkout}
    />]);

    function AddExercise(index){
        changeExerciseList([...exerciseList, <ExerciseRow 
            Key={exCount.current}
            key={Math.random()}
            exList={allExercises} 
            removal={() => {}}
            SendValueUp={TrackWorkout}
        />])
        exCount.current = exCount.current+1;
        dataForWorkout.current = [...dataForWorkout.current, {}];
        console.log(dataForWorkout);
    };

    function specialRemoveExercise()
    {
        changeExerciseList(exerciseList.slice(0, -1));
        exCount.current = Math.max(exCount.current-1, 0);
        dataForWorkout.current = dataForWorkout.current.slice(0, -1);
        console.log(dataForWorkout);
    }

    function getAllSetsForExercisesSubmitted () {
        const n = dataForWorkout.current;
        SendValueUp({data:{n}});
    }; //should eventually implement the functionality of the submit button

    const [setInfo, obtainSetInfo] = useState([]);

    return (
        <div style={{marginTop:"20px", flexGrow:3}}>
            <div style={{marginBottom:"15px"}}> {exerciseList} </div>
            <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{margin:10}}><Button size="sm" variant="outline-success" onClick={() => AddExercise(exCount.current)} style={{marginBottom:"15px"}}>Add Exercise</Button></div>
                <div style={{margin:10}}><Button size="sm" variant="outline-danger" onClick={() => specialRemoveExercise()} style={{marginBottom:"15px"}}>Remove Final Exercise</Button></div>
            </div>
            <div style={{margin:10}}><Button onClick={() => getAllSetsForExercisesSubmitted()} style={{marginBottom:"15px"}}>Submit Workout</Button></div>
        </div>
    );
}

//