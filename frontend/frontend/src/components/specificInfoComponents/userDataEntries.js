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

export default function UserDataEntries ()
{
    function ExerciseRow({exList, removal, Key})
    {
        const [sets, updateSets] = useState([<CreateSetBox/>]);
        function incSets() {updateSets([...sets, <CreateSetBox/>]);}
        function decSets() {updateSets(sets.slice(0, Math.max(sets.length-1, 1)))}
        //<button onClick={removal} style={{marginLeft:"10px", marginRight:"10px"}}>Remove Exercise</button>
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

    function RemoveExercise(index) {
        /*const copyBefore = [...exerciseList];
        copyBefore.splice(index, 1);
        changeExerciseList([...copyBefore]);
        changeExerciseCount(index);*/
        changeExerciseList(exerciseList.filter(i=>(i.key!==index)));
        changeExerciseCount(totalExerciseCount-1)
        console.log(exerciseList.map(i=>i.key));
    };

    function AddExercise(index){
        changeExerciseCount(totalExerciseCount+1);
        changeExerciseList([...exerciseList, <ExerciseRow Key={totalExerciseCount} exList={allExercises} removal={() => RemoveExercise(index)}/>])
    };

    function specialRemoveExercise()
    {
        changeExerciseList(exerciseList.slice(0, -1));
        changeExerciseCount(totalExerciseCount-1);
    }

    return (
        <div style={{marginTop:"20px"}}>
            <div style={{marginBottom:"15px"}}> {exerciseList} </div>
            <div><button onClick={() => AddExercise(totalExerciseCount)} style={{marginBottom:"15px"}}>Add Exercise</button></div>
            <div><button onClick={() => specialRemoveExercise()} style={{marginBottom:"15px"}}>Remove Final Exercise</button></div>
            <div><button style={{marginBottom:"15px"}}>Submit Workout</button></div>
        </div>
    );
}