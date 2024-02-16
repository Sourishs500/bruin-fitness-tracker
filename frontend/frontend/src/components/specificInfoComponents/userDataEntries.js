/*
Remaining Tasks
1) Stop hard-coding the allExercises variable
2) Implement getAllSetsForExercisesSubmitted
*/

import { useEffect, useState, useRef } from 'react';

function CreateTextBox()
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value);};
    return <textarea type="text" value={value} onChange={handleChange} placeholder="" style={{"width":"200px", "height":"25px", marginRight:"20px", overflowY:"scroll"}}/>;
};

function CreateSetBox(setNum, exLabel)
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value);};
    return <input type="text" label = {setNum} name = {exLabel} style = {{"width":"75px", height:"10px"}} onInput = {handleChange}/>;   
}

export default function UserDataEntries () //List of exercise rows, along with three buttons at the end (add exercise, remove exercise, and submit)
/*
functions defined: 
    ExerciseRow, RemoveExercise, AddExercise, specialRemoveExercise, getAllSetsForExercisesSubmitted
variables used: 
    allExercises (currently hard-coded but should be retrieved from an API), totalExerciseCount, exerciseList (list of ExerciseRow components)
*/

{
    function ExerciseRow({exList, removal, Key}) //One text box for notes, n text boxes for n sets, two buttons (add set, remove set)
    /*
        functions defined:
            incSets, decSets
        variables used:
            sets (list of CreateSetBox components)
    */
    {
        const [sets, updateSets] = useState([<CreateSetBox/>]);
        function incSets() {updateSets([...sets, <CreateSetBox/>]);}
        function decSets() {updateSets(sets.slice(0, Math.max(sets.length-1, 1)))}
        //<button onClick={removal} style={{marginLeft:"10px", marginRight:"10px"}}>Remove Exercise</button> //Couldn't get this 3rd button working

        return(
            <div key={Key} style={{display:"flex"}}>
                <CreateTextBox/>
                <select style={{marginRight:"10px"}}>{exList.map(category => <option value="Type of Exercise">{category}</option>)}</select> 
                <div>{sets}</div>
                <button onClick={incSets} style={{marginLeft:"10px", marginRight:"10px"}}>Add Set</button>
                <button onClick={decSets} style={{marginLeft:"10px", marginRight:"10px"}}>Remove Set</button>
                
            </div>
        );
    };

    const allExercises = ["Chest Press", "Preacher Curls", "Wall-Sits", "Bench Press", "Lat Pull-Downs", "Calf Raises"]
    const [totalExerciseCount, changeExerciseCount] = useState(1);
    const [exerciseList, changeExerciseList] = useState([<ExerciseRow key={totalExerciseCount} exList={allExercises} removal={() => RemoveExercise(0)}/>]);

    /*function RemoveExercise(index) { 
        /*const copyBefore = [...exerciseList];
        copyBefore.splice(index, 1);
        changeExerciseList([...copyBefore]);
        changeExerciseCount(index);
        changeExerciseList(exerciseList.filter(i=>(i.key!==index)));
        changeExerciseCount(totalExerciseCount-1)
        console.log(exerciseList.map(i=>i.key));
    }; //this function is associated with the third button in ExerciseRow that was ultimately commented out*/

    function RemoveExercise(index) {}; //this function should remove the ith exercise in a list; that functionality could not be implemented (attempt shown above)

    function AddExercise(index){
        changeExerciseCount(totalExerciseCount+1);
        changeExerciseList([...exerciseList, <ExerciseRow Key={totalExerciseCount} exList={allExercises} removal={() => RemoveExercise(index)}/>])
    };

    function specialRemoveExercise()
    {
        changeExerciseList(exerciseList.slice(0, -1));
        changeExerciseCount(totalExerciseCount-1);
    }

    function getAllSetsForExercisesSubmitted () {}; //should eventually implement the functionality of the submit button

    return (
        <div style={{marginTop:"20px"}}>
            <div style={{marginBottom:"15px"}}> {exerciseList} </div>
            <div><button onClick={() => AddExercise(totalExerciseCount)} style={{marginBottom:"15px"}}>Add Exercise</button></div>
            <div><button onClick={() => specialRemoveExercise()} style={{marginBottom:"15px"}}>Remove Final Exercise</button></div>
            <div><button onClick={() => getAllSetsForExercisesSubmitted()} style={{marginBottom:"15px"}}>Submit Workout</button></div>
        </div>
    );
}